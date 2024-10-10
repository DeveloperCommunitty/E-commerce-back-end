import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';
import { UsuarioService } from './usuario.service';

@ApiTags('Usuarios')
@Controller('usuario')
export class UsuarioController {
  constructor(private usuario: UsuarioService) { }

  @Get('usuarios')
  findAll() {
    return this.usuario.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuario.findOne(id);
  }
  @Get('email/:email')
  findOneForEmail(@Param('email') email: string) {
    return this.usuario.findOneForEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUsuarioDto) {
    return this.usuario.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuario.remove(id);
  }
}
