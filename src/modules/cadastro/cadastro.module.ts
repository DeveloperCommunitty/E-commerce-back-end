import { Module } from '@nestjs/common';
import { CadastroService } from './cadastro.service';
import { CadastroController } from './cadastro.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [CadastroController],
  providers: [CadastroService, PrismaService],
})
export class CadastroModule {}
