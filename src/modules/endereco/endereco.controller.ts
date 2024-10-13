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
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Endereço')
@Controller('endereco')
export class EnderecoController {
  constructor(private enderecoService: EnderecoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo endereço' })
  @ApiBody({ type: CreateAddressDto })
  @ApiResponse({ status: 201, description: 'Endereço criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos fornecidos.' })
  create(@Body() body: CreateAddressDto) {
    return this.enderecoService.create(body);
  }

  @Get('enderecos/:userid')
  @ApiOperation({ summary: 'Obter todos os endereços de um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Lista de endereços retornada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum endereço encontrado para o usuário.',
  })
  findAll(@Param('userId') userId: string) {
    return this.enderecoService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um endereço pelo ID' })
  @ApiResponse({ status: 200, description: 'Endereço encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.enderecoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um endereço pelo ID' })
  @ApiBody({ type: UpdateAddressDto })
  @ApiResponse({ status: 200, description: 'Endereço atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos fornecidos.' })
  update(@Param('id') id: string, @Body() body: UpdateAddressDto) {
    return this.enderecoService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um endereço pelo ID' })
  @ApiResponse({ status: 200, description: 'Endereço removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado.' })
  remove(@Param('id') id: string) {
    return this.enderecoService.remove(id);
  }
}
