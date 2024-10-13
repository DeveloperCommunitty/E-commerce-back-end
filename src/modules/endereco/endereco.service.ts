import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateAddressDto } from './dto/endereco.create.dto';
import { UpdateAddressDto } from './dto/endereco.update.dto';

@Injectable()
export class EnderecoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateAddressDto) {
    const {
      street,
      neighbourhood,
      city,
      zipCode,
      publicPlace,
      streetNumber,
      userId,
    } = body;

    const userCheck = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userCheck)
      throw new HttpException(`Usuário inexistente`, HttpStatus.NOT_FOUND);

    const addressCreate = await this.prisma.address.create({
      data: {
        street,
        neighbourhood,
        city,
        zipCode,
        publicPlace,
        streetNumber,
        userId,
      },
    });

    if (!addressCreate)
      throw new HttpException(
        `Erro ao criar endereço`,
        HttpStatus.EXPECTATION_FAILED,
      );

    return addressCreate;
  }

  async findAll(userId: string) {
    const addresses = await this.prisma.address.findMany({
      where: { userId },
      select: {
        id: true,
        userId: true,
        street: true,
        neighbourhood: true,
        city: true,
        zipCode: true,
        streetNumber: true,
        publicPlace: true,
      },
      orderBy: { id: 'desc' },
    });

    if (!addresses)
      throw new HttpException(
        `Erro ao listar endereços`,
        HttpStatus.EXPECTATION_FAILED,
      );

    return addresses;
  }

  async findOne(id: string) {
    const address = await this.prisma.address.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        userId: true,
        street: true,
        neighbourhood: true,
        city: true,
        zipCode: true,
        streetNumber: true,
        publicPlace: true,
      },
    });

    if (!address)
      throw new HttpException(`Endereço inexistente`, HttpStatus.NOT_FOUND);

    return address;
  }

  async update(id: string, body: UpdateAddressDto) {
    const addressCheck = await this.prisma.address.findUnique({
      where: { id },
    });
    if (!addressCheck)
      throw new HttpException(`Endereço inexistente`, HttpStatus.NOT_FOUND);

    const address = await this.prisma.address.update({
      where: { id },
      data: body,
    });

    if (!address)
      throw new HttpException(
        `Erro ao atualizar endereço`,
        HttpStatus.EXPECTATION_FAILED,
      );

    return address;
  }

  async remove(id: string) {
    const addressCheck = await this.prisma.address.findUnique({
      where: { id },
    });
    if (!addressCheck)
      throw new HttpException(`Endereço inexistente`, HttpStatus.NOT_FOUND);

    await this.prisma.address.delete({ where: { id } });

    return {
      message: 'Endereço deletado com sucesso',
      status: HttpStatus.NO_CONTENT,
    };
  }
}
