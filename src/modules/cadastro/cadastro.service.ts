import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CadastroDTO, Role } from './dto/cadastro.create.dto';
import { PrismaService } from '../../database/PrismaService';
import * as bcrypt from 'bcryptjs';
import { randomInt } from 'node:crypto';

@Injectable()
export class CadastroService {
  constructor(private readonly prisma: PrismaService) {}

  async createUsers(data: CadastroDTO) {
    if (data.role && data.role === Role.ADMIN) {
      throw new BadRequestException(
        'Não é permitido definir o papel como ADMIN.',
      );
    }

    const emailCheck = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (emailCheck) {
      throw new ForbiddenException('Email já está sendo usado');
    } else {
      const ramdomSalt = randomInt(10, 16);
      const hash = await bcrypt.hash(data.password, ramdomSalt);

      const cadastro = await this.prisma.user.create({
        data: {
          ...data,
          avatar: process.env.AVATAR_INCIAL,
          password: hash,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      return cadastro;
    }
  }
}
