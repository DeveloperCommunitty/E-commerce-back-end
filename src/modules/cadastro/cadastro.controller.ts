import { Body, Controller, Post } from '@nestjs/common';
import { CadastroService } from './cadastro.service';
import { CadastroDTO } from './dto/cadastro.create.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cadastro')
@Controller('cadastro')
export class CadastroController {
  constructor(private readonly cadastroService: CadastroService) {}

  @Post()
  async createUser(@Body() data: CadastroDTO) {
    return this.cadastroService.createUsers(data);
  }
}
