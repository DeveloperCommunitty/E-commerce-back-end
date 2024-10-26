import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class CadastroDTO {
  @ApiProperty({
    description: 'O e-mail do usuário, que será utilizado para autenticação',
    example: 'cliente@example.com',
  })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  @IsEmail({}, { message: 'Por favor, insira um e-mail válido.' })
  email: string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Nina Sebastiana',
  })
  name: string;

  @ApiProperty({
    description: 'A senha do usuário. Deve ser forte e segura.',
    example: 'cliente123',
  })
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
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
  avatarId?: string;

  @ApiProperty({
    description: 'O papel do usuário no sistema. Pode ser "USER" ou "ADMIN"',
    example: Role.USER,
    enum: Role,
    readOnly: true,
  })
  role: Role;
}
