import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CadastroService } from './cadastro.service';
import { CadastroDTO } from './dto/cadastro.create.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/skipAuth/SkipAuth';

@ApiTags('Cadastrar')
@Controller('cadastro')
export class CadastroController {
  constructor(private readonly cadastroService: CadastroService) {}

  @Post()
  @Public()
  async createUser(@Body() data: CadastroDTO) {
    return this.cadastroService.createUsers(data);
  }
}
