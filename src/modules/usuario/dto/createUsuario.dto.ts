import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
export class CreateUsuarioDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Fulano',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'O e-mail do usuário',
    example: 'fulano@example.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'A senha do usuário. Deve ser forte e segura.',
    example: 'senha123',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'URL do avatar do usuário',
    example:
      'https://res.cloudinary.com/dtk98bty4/image/upload/v1728862716/produtos/wwoedlsoaizy3leknzqg.jpg',
    readOnly: true,
  })
  avatar: string;

  @ApiProperty({
    description: 'ID do avatar do usuário para referência interna',
    example: 'b10qp9lpc9ibvuuztugu.png',
    readOnly: true,
  })
  avatarId: string;

  @ApiProperty({
    description: 'O papel do usuário no sistema. Pode ser "USER" ou "ADMIN"',
    example: 'USER',
  })
  role: Role;
}
