import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

export const CloudinaryStorageConfig = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let format = 'png';

    if (file.mimetype === 'image/jpeg') {
      format = 'jpg';
    } else if (file.mimetype === 'image/png') {
      format = 'png';
    } else {
      throw new Error('Invalid file type');
    }

    return {
      folder: 'backups',
      format: format,
      public_id: file.originalname, 
      transformation: [{ width: 500, height: 500, crop: 'limit' }, { quality: 'auto:low' }]
    };
  },
});
