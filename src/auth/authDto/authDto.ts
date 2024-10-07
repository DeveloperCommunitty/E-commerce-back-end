import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
    @ApiProperty({ example: 'teste@gmail.com', description: 'O Email do usuário' })
    email: string;
    @ApiProperty({ example: '123456', description: 'A senha do usuário' })
    password: string;
}
  