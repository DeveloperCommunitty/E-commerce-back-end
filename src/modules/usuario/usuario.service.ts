import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateUsuarioDto } from './dto/createUsuario.dto';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) { }

  async create(@Body() body: CreateUsuarioDto) {
    const { email, name, password, avatar, avatarId, role } = body;
    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password,
        avatar,
        avatarId,
        role,
      },
    });

    return user;
  }

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

    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
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

    return users;
  }

  async update(id: string, body: UpdateUsuarioDto) {
    const { email, name, password, avatar, avatarId, role } = body;
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        email,
        name,
        password,
        avatar,
        avatarId,
        role,
      }
    });

    return user;
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
