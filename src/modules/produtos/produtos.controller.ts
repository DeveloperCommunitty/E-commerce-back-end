import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/auth/skipAuth/skipAuth';
import { Action } from 'src/casl/casl-ability.factory/actionDto/casl-action.dto';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { CheckPolicies } from 'src/casl/guards/policies.check';
import { PoliciesGuard } from 'src/casl/guards/policies.guard';
import { CloudinaryStorageConfig } from 'src/cloudinary/Multer.config';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ProductsDto } from './dto/produtos.dto';
import { UpdateProductsDto } from './dto/produtos.update.dto';
import { ProdutosService } from './produtos.service';

@ApiTags('Produtos')
@Controller('produtos')
@UseGuards(PoliciesGuard)
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
  @ApiBody({ description: 'Dados do produto com imagem', type: ProductsDto })
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
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número da página (opcional, padrão: 1)',
    type: Number,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'Quantidade de itens por página (opcional, padrão: 10)',
    type: Number,
  })
  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @ApiOperation({ summary: 'Lista produto por Id' })
  @Public()
  @ApiParam({ name: 'id', description: 'Id do produto' })
  @ApiResponse({ status: 200, description: 'Produto encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto inexistente' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Public()
  @ApiQuery({
    name: 'name',
    required: true,
    description: 'Pesquisar um produtos',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número da página (opcional, padrão: 1)',
    type: Number,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'Quantidade de itens por página (opcional, padrão: 10)',
    type: Number,
  })
  @ApiResponse({ status: 200, description: 'Produto encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Nenhum produto encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @Get('/search/produto')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  async searchProducts(
    @Query('name') name: string,
    @Query('page') page?: string,
  ) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    return this.productsService.searchProducts(name, pageNumber);
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
      'Disponível apenas para Admin. Quantidade de produtos é somada com o valor passado. Atualização da imagem é opcional.',
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
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
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
  @ApiResponse({ status: 204, description: 'Produto deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto inexistente' })
  @ApiResponse({ status: 400, description: 'Erro ao deletar produto' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @Delete(':id')
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
  destroy(@Param('id') id: string) {
    return this.productsService.destroy(id);
  }

  @Public()
  @Get('filter/price')
  @ApiQuery({
    name: 'minPrice',
    required: false,
    description: 'Preço mínimo dos produtos',
  })
  @ApiQuery({
    name: 'maxPrice',
    required: false,
    description: 'Preço máximo dos produtos',
  })
  @ApiResponse({ status: 200, description: 'Produto filtrado com sucesso.' })
  async filterByPrice(
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
  ) {
    return this.productsService.filterByPrice(minPrice, maxPrice);
  }
}
