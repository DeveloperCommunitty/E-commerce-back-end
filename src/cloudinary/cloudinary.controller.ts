import {
    Controller,
    HttpException,
    HttpStatus,
    Post,
    UploadedFiles,
    UseInterceptors,
  } from '@nestjs/common';
  import { FilesInterceptor } from '@nestjs/platform-express';
  import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
  import { CloudinaryStorageConfig } from 'src/cloudinary/Multer.config';
  
  @Controller('upload')
  export class CloudinaryController {
    constructor(private readonly cloudinaryService: CloudinaryService) {}
  
    @Post()
    @UseInterceptors(
      FilesInterceptor('files', 10, { // Limite de arquivos
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
    async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
      if (!files || files.length === 0) {
        throw new HttpException('Nenhum arquivo encontrado', HttpStatus.NOT_FOUND); 
      }
  
      const uploadResults = await Promise.all(files.map(file => this.cloudinaryService.uploadImage(file)));
      return uploadResults;
    }
  }
  