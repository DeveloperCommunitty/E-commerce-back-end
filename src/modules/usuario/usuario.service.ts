import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';

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

  async update(id: string, body: UpdateUsuarioDto) {
    const userCheck = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!userCheck)
      throw new HttpException(`Usuário inexistente`, HttpStatus.NOT_FOUND);


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
    if (!user)
      throw new HttpException(`Erro ao atualizar usuário`, HttpStatus.EXPECTATION_FAILED);

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
