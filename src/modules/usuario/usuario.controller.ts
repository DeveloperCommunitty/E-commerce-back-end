import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/createUsuario.dto';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';
import { UsuarioService } from './usuario.service';


@Controller('usuario')
export class UsuarioController {
  constructor(private usuario: UsuarioService) { }

  @Post()
  create(@Body() body: CreateUsuarioDto) {
    return this.usuario.create(body);
  }

  @Get('usuarios')
  findAll() {
    return this.usuario.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuario.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, body: UpdateUsuarioDto) {
    return this.usuario.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuario.remove(id);
  }
}

