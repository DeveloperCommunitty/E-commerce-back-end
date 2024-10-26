import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUsuarioDto } from './createUsuario.dto';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @ApiProperty({
    example: 'Nina',
  })
  name?: string;

  @ApiProperty({
    example: 'cliente@example.com',
  })
  email?: string;

  @ApiProperty({
    example: 'cliente123',
  })
  password?: string;

  @ApiProperty({
    example:
      'https://res.cloudinary.com/dtk98bty4/image/upload/v1728862716/produtos/wwoedlsoaizy3leknzqg.jpg',
    readOnly: true,
  })
  avatar?: string;

  @ApiProperty({
    example: 'wwoedlsoaizy3leknzqg.jpg',
    readOnly: true,
  })
  avatarId?: string;

  @ApiProperty({
    example: 'USER',
    readOnly: true,
  })
  role?: Role;
}
