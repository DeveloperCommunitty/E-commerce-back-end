import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/skipAuth/skipAuth';
import { CadastroService } from './cadastro.service';
import { CadastroDTO } from './dto/cadastro.create.dto';

@ApiTags('Cadastro')
@Controller('cadastro')
export class CadastroController {
  constructor(private readonly cadastroService: CadastroService) { }

  @Post()
  @Public()
  async createUser(@Body() data: CadastroDTO) {
    return this.cadastroService.createUsers(data);
  }
}
