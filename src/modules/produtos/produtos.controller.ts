import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CheckPolicies } from 'src/casl/guards/policies.check';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/casl/casl-ability.factory/actionDto/casl-action.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsDto } from './dto/produtos.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryStorageConfig } from 'src/cloudinary/Multer.config';

@ApiTags('Produto')
@Controller('produto')
export class ProdutosController {
  constructor(private readonly productsService: ProdutosService) {}

  @ApiOperation({ summary: 'Lista todos os produtos.' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Erro ao listar produtos' })
  @Get('produtos')
  findAll() {
    return this.productsService.findAll();
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: CloudinaryStorageConfig,
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(new Error('Tipo de arquivo inválido'), false);
        }
        cb(null, true);
      },
    }),
  )
  @ApiOperation({
    summary: 'Cria produto',
    description:
      'Disponível apenas para Admin. Adicione a imagem com a chave: files.',
  })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 417, description: 'O produto já existe!' })
  @ApiResponse({ status: 417, description: 'Erro ao criar produto' })
  @ApiBearerAuth()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
  create(
    @Body() body: ProductsDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.productsService.create(body, files);
  }

  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: CloudinaryStorageConfig,
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(new Error('Tipo de arquivo inválido'), false);
        }
        cb(null, true);
      },
    }),
  )
  @ApiOperation({
    summary: 'Atualiza dados do produto',
    description:
      'Disponível apenas para Admin. Atualização da imagem é opcional. Adicione a imagem com a chave: files.',
  })
  @ApiParam({ name: 'id', description: 'Id do produto' })
  @ApiResponse({ status: 404, description: 'Produto inexistente!' })
  @ApiResponse({
    status: 417,
    description: 'Nome do produto já está cadastrado!',
  })
  @ApiResponse({ status: 417, description: 'Erro ao atualizar produto' })
  @ApiBearerAuth()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: ProductsDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.productsService.update(id, body, files);
  }

  @ApiOperation({ summary: 'Lista produto por Id' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'Id do produto' })
  @ApiResponse({ status: 404, description: 'Produto inexistente!' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Deleta produto por Id',
    description: 'Disponível apenas para Admin.',
  })
  @ApiParam({ name: 'id', description: 'Id do produto' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Produto inexistente!' })
  @ApiResponse({ status: 417, description: 'Erro ao atualizar produto' })
  @Delete(':id')
  @ApiBearerAuth()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
  destroy(@Param('id') id: string) {
    return this.productsService.destroy(id);
  }
}
