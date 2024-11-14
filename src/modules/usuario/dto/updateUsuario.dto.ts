import { ApiProperty } from '@nestjs/swagger';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
export class UpdateUsuarioDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Imagem do Avatar',
    example: 'avatar.png',
    required: false,
  })
  file?: Express.Multer.File;

  @ApiProperty({
    example: 'Nina',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: 'cliente@example.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    example: 'cliente123',
    required: false,
  })
  password?: string;
}
