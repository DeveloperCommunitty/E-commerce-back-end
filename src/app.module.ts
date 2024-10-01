import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaService } from './database/PrismaService';

@Module({
  imports: [UsuarioModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
