import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/perfil.create.dto';
import { PerfilService } from './perfil.service';
import { UpdateProfileDto } from './dto/perfil.update.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { CheckPolicies } from 'src/casl/guards/policies.check';
import { Action } from 'src/casl/casl-ability.factory/actionDto/casl-action.dto';
import { PoliciesGuard } from 'src/casl/guards/policies.guard';

@ApiTags('Perfil')
@Controller('perfil')
@UseGuards(PoliciesGuard) 
export class PerfilController {
  constructor(private profile: PerfilService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um perfil para o usuário' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: `Cpf já está sendo usado` })
  @ApiResponse({ status: 404, description: `Usuário inexistente` })
  @ApiResponse({ status: 417, description: `Erro ao criar perfil` })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  create(@Body() body: CreateProfileDto) {
    return this.profile.create(body);
  }
  
  @Get('perfis')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
  @ApiOperation({ summary: 'Lista perfis',
    description: 'Disponível somente para Administrador',
  })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 417, description: `Erro ao listar perfis` })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página (opcional, padrão: 1)', type: Number })
  @ApiQuery({ name: 'pageSize', required: false, description: 'Quantidade de itens por página (opcional, padrão: 10)', type: Number })
  @ApiBearerAuth('access_token')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.profile.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um perfil pelo id' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: `Perfil inexistente` })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  findOne(@Param('id') id: string) {
    return this.profile.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza dados de um perfil' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: `Perfil ou Usuário inexistente` })
  @ApiResponse({ status: 417, description: `Erro ao atualizar perfil` })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  update(@Param('id') id: string, @Body() body: UpdateProfileDto) {
    return this.profile.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um perfil' })
  @ApiResponse({ status: 204, description: `Perfil deletado com sucesso` })
  @ApiResponse({ status: 404, description: `Perfil inexistente` })
  @ApiResponse({ status: 417, description: `Erro ao deletar perfil` })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  remove(@Param('id') id: string) {
    return this.profile.remove(id);
  }
}
