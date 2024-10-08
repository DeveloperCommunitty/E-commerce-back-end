import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/perfil.create.dto';
import { PerfilService } from './perfil.service';
import { UpdateProfileDto } from './dto/perfil.update.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Perfil')
@Controller('perfil')
export class PerfilController {
  constructor(private profile: PerfilService) {}

  @Post()
  create(@Body() body: CreateProfileDto) {
    return this.profile.create(body);
  }

  @Get('perfis')
  findAll() {
    return this.profile.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profile.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string,@Body() body: UpdateProfileDto) {
    return this.profile.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profile.remove(id);
  }
}
