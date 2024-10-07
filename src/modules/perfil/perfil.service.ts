import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/perfil.create.dto';
import { UpdateProfileDto } from './dto/perfil.update.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class PerfilService {
  constructor(private prisma: PrismaService) {}

  async create(@Body() body: CreateProfileDto) {
    const { firstName, lastName, cpf, birthDate, ddd, phone, genero, userId } =
      body;

    const userCheck = await this.prisma.user.findFirst({
      where: { id: userId },
    });
    if (!userCheck)
      throw new HttpException(`Usuário inexistente`, HttpStatus.NOT_FOUND);

    const cpfCheck = await this.prisma.profiles.findFirst({ where: { cpf } });
    if (cpfCheck)
      throw new HttpException(
        `Cpf já está sendo usado`,
        HttpStatus.BAD_REQUEST,
      );

    const profileCreate = await this.prisma.profiles.create({
      data: {
        firstName,
        lastName,
        cpf,
        birthDate,
        ddd,
        phone,
        genero,
        userId,
      },
    });

    if (!profileCreate)
      throw new HttpException(
        `Erro ao criar perfil`,
        HttpStatus.EXPECTATION_FAILED,
      );

    return profileCreate;
  }

  async findAll() {
    const allProfiles = await this.prisma.profiles.findMany({
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        cpf: true,
        birthDate: true,
        phone: true,
        genero: true,
        userId: true,
      },
    });

    if (!allProfiles)
      throw new HttpException(
        `Erro ao listar perfis`,
        HttpStatus.EXPECTATION_FAILED,
      );

    return allProfiles;
  }

  async findOne(id: string) {
    const profile = await this.prisma.profiles.findUnique({ where: { id } });

    if (!profile)
      throw new HttpException(`Perfil inexistente`, HttpStatus.NOT_FOUND);

    return profile;
  }

  async update(id: string, body: UpdateProfileDto) {
    const profileCheck = await this.prisma.profiles.findFirst({
      where: { id },
    });
    if (!profileCheck)
      throw new HttpException(`Perfil inexistente`, HttpStatus.NOT_FOUND);

    const { firstName, lastName, cpf, birthDate, ddd, phone, genero, userId } =
      body;

    const userCheck = await this.prisma.user.findFirst({
      where: { id: userId },
    });
    if (!userCheck)
      throw new HttpException(`Usuário inexistente`, HttpStatus.NOT_FOUND);

    const profile = await this.prisma.profiles.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        cpf,
        birthDate,
        ddd,
        phone,
        genero,
      },
    });

    if (!profile)
      throw new HttpException(
        `Erro ao atualizar perfil`,
        HttpStatus.EXPECTATION_FAILED,
      );

    return profile;
  }

  async remove(id: string) {
    const profileCheck = await this.prisma.profiles.findUnique({
      where: { id },
    });
    if (!profileCheck)
      throw new HttpException(`Perfil inexistente`, HttpStatus.NOT_FOUND);

    const profileDeleted = await this.prisma.profiles.delete({ where: { id } });

    if (!profileDeleted)
      throw new HttpException(
        `Erro ao deletar perfil`,
        HttpStatus.EXPECTATION_FAILED,
      );

    throw new HttpException(
      `Perfil deletado com sucesso`,
      HttpStatus.NO_CONTENT,
    );
  }
}
