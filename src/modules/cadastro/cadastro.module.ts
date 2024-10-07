import { Module } from '@nestjs/common';
import { CadastroService } from './cadastro.service';
import { CadastroController } from './cadastro.controller';
import { PrismaService } from '../../database/PrismaService';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [CaslModule],
  controllers: [CadastroController],
  providers: [CadastroService, PrismaService],
})
export class CadastroModule {}
