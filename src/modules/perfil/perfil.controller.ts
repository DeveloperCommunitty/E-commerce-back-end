import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
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

@ApiTags('Perfil')
@Controller('perfil')
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
  create(@Body() body: CreateProfileDto) {
    return this.profile.create(body);
  }

  @Get('perfis')
  @ApiOperation({ summary: 'Lista perfis' })
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
  remove(@Param('id') id: string) {
    return this.profile.remove(id);
  }
}
