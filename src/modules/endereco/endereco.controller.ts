import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/endereco.create.dto';
import { EnderecoService } from './endereco.service';
import { UpdateAddressDto } from './dto/endereco.update.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Endereço')
@Controller('endereco')
export class EnderecoController {
  constructor(private enderecoService: EnderecoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo endereço' })
  @ApiBody({ type: CreateAddressDto })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Usuário inexistente' })
  @ApiResponse({ status: 417, description: 'Erro ao criar endereço' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth()
  create(@Body() body: CreateAddressDto) {
    return this.enderecoService.create(body);
  }

  @Get('enderecos/:userid')
  @ApiOperation({ summary: 'Obter todos os endereços de um usuário' })
  @ApiResponse({
    status: 200
  })
  @ApiResponse({
    status: 417,
    description: 'Erro ao listar endereços',
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth()
  findAll(@Param('userId') userId: string) {
    return this.enderecoService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um endereço pelo id' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: `Endereço inexistente` })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.enderecoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um endereço pelo id' })
  @ApiBody({ type: UpdateAddressDto })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Endereço inexistente' })
  @ApiResponse({ status: 417, description: 'Erro ao atualizar endereço' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() body: UpdateAddressDto) {
    return this.enderecoService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um endereço pelo id' })
  @ApiResponse({ status: 204, description: 'Endereço removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.enderecoService.remove(id);
  }
}
