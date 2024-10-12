import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/endereco.create.dto';
import { EnderecoService } from './endereco.service';
import { UpdateAddressDto } from './dto/endereco.update.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Endereço')
@Controller('endereco')
export class EnderecoController {
  constructor(private enderecoService: EnderecoService) {}

  @Post()
  create(@Body() body: CreateAddressDto) {
    return this.enderecoService.create(body);
  }

  @Get('enderecos/:userid')
  findAll(@Param('userId') userId: string) {
    return this.enderecoService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enderecoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateAddressDto) {
    return this.enderecoService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enderecoService.remove(id);
  }
}
