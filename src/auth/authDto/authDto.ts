import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
    @ApiProperty({ example: 'teste@gmail.com', description: 'O Email do usuário' })
    @IsEmail()
    @IsNotEmpty({message: "Digite um email válido!"})
    email: string;
    @ApiProperty({ example: 'teste123456', description: 'A senha do usuário.' })
    @IsNotEmpty({message: "Digite uma senha!"})
    password: string;
}