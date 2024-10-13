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
import { ApiTags } from '@nestjs/swagger';
import { UpdateUsuarioDto } from './dto/updateUsuario.dto';
import { UsuarioService } from './usuario.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryStorageConfig } from 'src/cloudinary/Multer.config';

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
  update(@Param('id') id: string, @Body() body: UpdateUsuarioDto, @UploadedFile() file: Express.Multer.File) {
    return this.usuario.update(id, body, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuario.remove(id);
  }
}
