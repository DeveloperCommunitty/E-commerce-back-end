import { Module } from '@nestjs/common';
import { EnderecoController } from './endereco.controller';
import { EnderecoService } from './endereco.service';
import { CaslModule } from 'src/casl/casl.module';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  imports: [CaslModule],
  controllers: [EnderecoController],
  providers: [EnderecoService, PrismaService],
})
export class EnderecoModule {}
