import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { PrismaService } from 'src/database/PrismaService';
import { CaslModule } from 'src/casl/casl.module';

@Module({
    imports: [CaslModule],
    controllers: [ProdutosController],
    providers: [ProdutosService, PrismaService]
})
export class ProdutosModule {}
