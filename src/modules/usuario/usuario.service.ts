import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { User } from './dto/usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World na parte de Usuários';
  }

  async findOne(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email }, 
      select:{
        id: true,
        email: true,
        name: true,
        password: true,
      }
    });

    return user;
  }
}
