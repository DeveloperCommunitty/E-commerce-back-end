import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CloudinaryStorageConfig } from 'src/cloudinary/Multer.config';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';
import { UsuarioService } from './usuario.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CheckPolicies } from 'src/casl/guards/policies.check';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/casl/casl-ability.factory/actionDto/casl-action.dto';
import { PoliciesGuard } from 'src/casl/guards/policies.guard';

@ApiTags('Usuarios')
@Controller('usuarios')
@UseGuards(PoliciesGuard)
export class UsuarioController {
  constructor(private usuario: UsuarioService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({ status: 200, description: `Usuários listado com sucesso.` })
  @ApiResponse({ status: 404, description: `Nenhum usuário encontrado` })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número da página (opcional, padrão: 1)',
    type: Number,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: 'Quantidade de itens por página (opcional, padrão: 10)',
    type: Number,
  })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usuario.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um usuário por id' })
  @ApiResponse({ status: 200, description: `Usuário listado com sucesso.` })
  @ApiResponse({ status: 404, description: `Usuário não encontrado` })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número da página (opcional, padrão: 1)',
  })
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  findOne(@Param('id') id: string, @Query('page') page?: string) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    return this.usuario.findOne(id, pageNumber);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: CloudinaryStorageConfig,
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(new Error('Tipo de arquivo inválido'), false);
        }
        cb(null, true);
      },
    }),
  )
  @ApiOperation({ summary: 'Atualiza um usuário por id' })
  @ApiResponse({ status: 200, description: `Usuário atualizado com sucesso` })
  @ApiResponse({ status: 404, description: `Usuário inexistente` })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth('access_token')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  update(
    @Param('id') id: string,
    @Body() body: UpdateUsuarioDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usuario.update(id, body, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um usuário por id' })
  @ApiResponse({ status: 204, description: `Usuário deletado com sucesso` })
  @ApiResponse({ status: 404, description: `Usuário inexistente` })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @CheckPolicies((ability: AppAbility) => ability.can(Action.User, 'all'))
  @ApiBearerAuth('access_token')
  remove(@Param('id') id: string) {
    return this.usuario.remove(id);
  }
}
