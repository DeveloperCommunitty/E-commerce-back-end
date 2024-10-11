import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { PrismaService } from 'src/database/PrismaService';
import { CaslModule } from 'src/casl/casl.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
    imports: [CaslModule, CloudinaryModule],
    controllers: [ProdutosController],
    providers: [ProdutosService, PrismaService]
})
export class ProdutosModule {}
