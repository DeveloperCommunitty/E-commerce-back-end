import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDTO } from './dto/cart.create.dto';
import { CheckPolicies } from 'src/casl/guards/policies.check';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/casl/casl-ability.factory/actionDto/casl-action.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Carrinho')
@Controller('carrinhos')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Cria o carrinho' })
  @ApiBody({ type: CreateCartDTO })
  @ApiResponse({ status: 200, description: 'Listagem gerada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao criar carrinho' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  async create(@Body() body: CreateCartDTO) {
    return this.cartService.create(body);
  }

  @Get()
  @ApiOperation({
    summary: 'Lista todos os carrinhos',
    description: 'Disponível somente para Administrador',
  })
  @ApiResponse({ status: 200, description: 'Listagem gerada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao listar carrinhos' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
  async findAllUsers() {
    return this.cartService.findAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um carrinho pelo id' })
  @ApiResponse({ status: 200, description: 'Listagem gerada com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Carrinho não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  async findById(@Param('id') id: string) {
    return this.cartService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza dados de um carrinho' })
  @ApiResponse({ status: 200, description: 'Dados atualizados com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar carrinho' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Carrinho inexistente' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  async update(@Param('id') id: string) {
    return this.cartService.update(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta os itens de um carrinho' })
  @ApiResponse({ status: 200, description: 'Itens deletados com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao deletar carrinho' })
  @ApiResponse({ status: 401, description: 'Usuário não autorizado' })
  @ApiResponse({ status: 404, description: 'Carrinho inexistente' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  async destroy(@Param('id') id: string) {
    return this.cartService.destroy(id);
  }
}
