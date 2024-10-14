import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UploadedFile,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';
import { UsuarioService } from './usuario.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryStorageConfig } from 'src/cloudinary/Multer.config';

@ApiTags('Usuarios')
@Controller('usuario')
export class UsuarioController {
  constructor(private usuario: UsuarioService) { }

  @Get('usuarios')
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 417, description: `Nenhum usuário encontrado`})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth()
  findAll() {
    return this.usuario.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um usuário por id' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: `Usuário não encontrado`})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.usuario.findOne(id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Lista um usuário por email' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: `Não foi possível localizar o Usuário`})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth()
  findOneForEmail(@Param('email') email: string) {
    return this.usuario.findOneForEmail(email);
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
  @ApiResponse({ status: 404, description: `Usuário inexistente`})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() body: UpdateUsuarioDto, @UploadedFile() file: Express.Multer.File) {
    return this.usuario.update(id, body, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um usuário por id' })
  @ApiResponse({ status: 204, description: `Usuário deletado com sucesso` })
  @ApiResponse({ status: 404, description: `Usuário inexistente`})
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.usuario.remove(id);
  }
}
