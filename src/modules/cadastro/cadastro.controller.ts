import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/skipAuth/skipAuth';
import { CadastroService } from './cadastro.service';
import { CadastroDTO } from './dto/cadastro.create.dto';

@ApiTags('Cadastrar')
@Controller('cadastro')
export class CadastroController {
  constructor(private readonly cadastroService: CadastroService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário cadastrado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou faltando campos obrigatórios.',
  })
  @ApiResponse({ status: 403, description: 'Email já está sendo usado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @Public()
  async createUser(@Body() data: CadastroDTO) {
    return this.cadastroService.createUsers(data);
  }
}
