import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import { randomInt } from 'node:crypto';
import { PrismaService } from '../../database/PrismaService';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(identifier: string, page: number = 1) {
    const isEmail = identifier.includes('@');

    const pageSize = 5;
    page = Math.max(page, 1);
    const offset = (page - 1) * pageSize;

    const user = await this.prisma.user.findUnique({
      where: isEmail ? { email: identifier } : { id: identifier },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        avatar: true,
        role: true,
        Profiles: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            cpf: true,
            genero: true,
            birthDate: true,
            ddd: true,
            phone: true,
            userId: true,
          },
        },
        Address: {
          select: {
            id: true,
            city: true,
            street: true,
            neighbourhood: true,
            publicPlace: true,
            streetNumber: true,
            zipCode: true,
            userId: true,
          },
        },
        Carts: {
          select: {
            id: true,
            status: true,
            total: true,
            sessionId: true,
            paymentId: true,
            CartItems: {
              select: {
                id: true,
                quantity: true,
                cartId: true,
                productId: true,
              },
            },
          },
          skip: offset,
          take: pageSize,
        },
      },
    });
    if (!user)
      throw new HttpException(`Usuário não encontrado`, HttpStatus.NOT_FOUND);

    const totalCarts = await this.prisma.carts.count({
      where: { userId: user.id },
    });

    const totalPages = Math.ceil(totalCarts / pageSize);

    return { user, totalPages, totalCarts };
  }

  async findAll() {
    const allUsers = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
      },
    });
    if (!allUsers)
      throw new HttpException(
        `Nenhum usuário encontrado`,
        HttpStatus.EXPECTATION_FAILED,
      );

    return allUsers;
  }

  async update(id: string, body: UpdateUsuarioDto, file: Express.Multer.File) {
    const userCheck = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!userCheck)
      throw new HttpException(`Usuário inexistente`, HttpStatus.NOT_FOUND);

    const { name, password } = body;
    let avatar_id = null;
    let avatar_url = null;

    const ramdomSalt = randomInt(10, 16);
    const hash = await bcrypt.hash(password, ramdomSalt);

    if (file && userCheck) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'avatar',
      });

      avatar_id = result.public_id;
      avatar_url = result.secure_url;
    }

    if (file && userCheck.avatarId)
      await cloudinary.uploader.destroy(userCheck.avatarId);

    if (file) {
      const user = await this.prisma.user.update({
        where: { id },
        data: {
          name,
          password: hash,
          avatar: avatar_url,
          avatarId: avatar_id,
        },
      });

      if (user) {
        throw new HttpException(
          `Usuário atualizado com sucesso`,
          HttpStatus.OK,
        );
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
