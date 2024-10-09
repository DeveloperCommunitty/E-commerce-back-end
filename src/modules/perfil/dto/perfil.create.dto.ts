import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export enum Genero{
  MASCULINO = "MASCULINO", 
  FEMININO = "FEMININO"
}

export class CreateProfileDto {
    @ApiProperty({
        example: 'Fulano', 
        description: "Primeiro nome no perfil"
    })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({
        example: 'Silva', 
        description: "Último nome no perfil"
    })
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({
        example: '000.000.000-00', 
        description: "CPF do usuário"
    })
    @IsNotEmpty()
    cpf: string;

    @ApiProperty({
        example: '00/00/0000', 
        description: "Data de nascimento do usuário"
    })
    @IsNotEmpty()
    birthDate: string;

    @ApiProperty({
        example: '+55', 
        description: "DDD do telefone do usuário"
    })
    ddd: string;

    @ApiProperty({
        example: '(00) 0 0000-0000', 
        description: "Telefone do usuário"
    })
    phone: string;
    
    @ApiProperty({
        example: 'MASCULINO', 
        description: "Gênero do usuário"
    })
    genero: Genero;

    @ApiProperty({
        example: 'Fulano', 
        description: "Id do usuário para garantir o relacionamento de perfil com usuário"
    })
    @IsNotEmpty()
    userId: string;
}
