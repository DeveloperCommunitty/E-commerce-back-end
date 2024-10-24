import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<{ public_id: string; url: string }> {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'produtos'
    });
    return {
      public_id: result.public_id,
      url: result.secure_url, 
    };
  }

  async destroy(public_id: string){
    await cloudinary.uploader.destroy(public_id);
  }
}
