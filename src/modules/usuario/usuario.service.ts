import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { randomInt } from 'node:crypto';
import { PrismaService } from '../../database/PrismaService';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';
import { v2 as cloudinary } from 'cloudinary';


@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) { }


  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        avatar: true,
        avatarId: true,
        role: true,
      }
    });
    if (!user)
      throw new HttpException(`Usuário não encontrado`, HttpStatus.NOT_FOUND);

    return user;
  }

  async findOneForEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        role: true
      }
    });
    if (!user)
      throw new HttpException(`Não foi possível localizar o Usuário`, HttpStatus.NOT_FOUND);

    return user;
  }

  async findAll() {
    const allUsers = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        avatar: true,
        avatarId: true,
        role: true,
      }
    });
    if (!allUsers)
      throw new HttpException(`Nenhum usuário encontrado`, HttpStatus.EXPECTATION_FAILED);

    return allUsers;
  }

  async update(id: string, body: UpdateUsuarioDto, file: Express.Multer.File) {
    const userCheck = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!userCheck)
      throw new HttpException(`Usuário inexistente`, HttpStatus.NOT_FOUND);

    const { email, name, password } = body;
    let avatar_id = null;
    let avatar_url = null;

    console.log(name)
    const emailCheck = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (emailCheck) {
      throw new ForbiddenException('Email já está sendo usado');
    }
    const ramdomSalt = randomInt(10, 16);
    const hash = await bcrypt.hash(password, ramdomSalt);

    if(file && userCheck){
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'avatar',
      });

      avatar_id = result.public_id;
      avatar_url = result.secure_url;
    }

    if(file && userCheck.avatarId) await cloudinary.uploader.destroy(userCheck.avatarId);

    if(file){
      const user = await this.prisma.user.update({
        where: { id },
        data: {
          email,
          name,
          password: hash,
          avatar: avatar_url,
          avatarId: avatar_id,
        }
      });
      
      if (user) {
        throw new HttpException(`Usuário atualizado com sucesso`, HttpStatus.OK);
      }
  
      return user;
    }
  }

  async remove(id: string) {
    const userCheck = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userCheck) {
      throw new HttpException(`Usuário inexistente`, HttpStatus.NOT_FOUND);
    }

    await this.prisma.user.delete({ where: { id } });

    return {
      message: `Usuário deletado com sucesso`,
      status: HttpStatus.NO_CONTENT,
    };
  }

}
