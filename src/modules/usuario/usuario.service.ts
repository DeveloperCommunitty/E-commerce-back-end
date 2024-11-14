import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { randomInt } from 'node:crypto';
import { PrismaService } from '../../database/PrismaService';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';
import { v2 as cloudinary } from 'cloudinary';
import { PaginationDto } from 'src/common/dto/pagination.dto';

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

  async findAll(paginationDto: PaginationDto) {
    const { page, pageSize } = paginationDto;
    const offset = (page - 1) * pageSize;

    const allUsers = await this.prisma.user.findMany({
      skip: offset,
      take: pageSize,
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

    const totalUsers = await this.prisma.user.count();

    return {
      data: allUsers,
      totalPages: Math.ceil(totalUsers / pageSize),
      currentPage: page,
    };
  }

  async update(id: string, body: UpdateUsuarioDto, file?: Express.Multer.File) {
    const userCheck = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!userCheck) {
      throw new HttpException(`Usuário inexistente`, HttpStatus.NOT_FOUND);
    }

    const { name, password, email } = body;
    const updateData: any = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;

    if (password) {
      const ramdomSalt = randomInt(10, 16);
      updateData.password = await bcrypt.hash(password, ramdomSalt);
    }

    if (file) {
      if (userCheck.avatarId) {
        await cloudinary.uploader.destroy(userCheck.avatarId);
      }

      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'avatar',
      });

      updateData.avatar = result.secure_url;
      updateData.avatarId = result.public_id;
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateData,
    });

    if (updatedUser) {
      throw new HttpException(`Usuário atualizado com sucesso`, HttpStatus.OK);
    }

    return updatedUser;
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
