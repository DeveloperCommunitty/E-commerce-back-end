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
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsDto } from './dto/produtos.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryStorageConfig } from 'src/cloudinary/Multer.config';
import { Public } from 'src/auth/skipAuth/skipAuth';
import { UpdateProductsDto } from './dto/produtos.update.dto';

@ApiTags('Produto')
@Controller('produtos')
export class ProdutosController {
  constructor(private readonly productsService: ProdutosService) {}

  @Post()
  @ApiBearerAuth('access_token')
  @ApiResponse({
    status: 200,
    description: 'Produto criado com sucesso.',
    type: ProductsDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum arquivo enviado ou produto existente',
  })
  @ApiResponse({ status: 409, description: 'O produto ou o código já existe' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou faltando' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
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
    description: 'Disponível apenas para Admin.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Dados do produto com imagem',
    type: ProductsDto,
  })
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
  create(
    @Body() body: ProductsDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.productsService.create(body, files);
  }

  @ApiOperation({ summary: 'Lista todos os produtos' })
  @Public()
  @ApiResponse({ status: 200, description: 'Produto encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Erro ao listar produtos' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({ summary: 'Lista produto por Id' })
  @Public()
  @ApiParam({ name: 'id', description: 'Id do produto' })
  @ApiResponse({ status: 200, description: 'Produto encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto inexistente' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
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
      'Disponível apenas para Admin. Atualização da imagem é opcional.',
  })
  @ApiParam({ name: 'id', description: 'Id do produto' })
  @ApiResponse({
    status: 200,
    description: 'Produto atualizado com sucesso.',
    type: UpdateProductsDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Nome do produto já está cadastrado',
  })
  @ApiResponse({ status: 404, description: 'Produto inexistente' })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar produto' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Dados do produto com imagem',
    type: UpdateProductsDto,
  })
  update(
    @Param('id') id: string,
    @Body() body: UpdateProductsDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.productsService.update(id, body, files);
  }

  @ApiOperation({
    summary: 'Deleta produto por Id',
    description: 'Disponível apenas para Admin.',
  })
  @ApiParam({ name: 'id', description: 'Id do produto' })
  @ApiResponse({
    status: 204,
    description: 'Produto deletado com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Produto inexistente' })
  @ApiResponse({ status: 400, description: 'Erro ao deletar produto' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @Delete(':id')
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
  destroy(@Param('id') id: string) {
    return this.productsService.destroy(id);
  }
}
