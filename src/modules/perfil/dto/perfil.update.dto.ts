import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './perfil.create.dto';
import { Genero } from './perfil.create.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    @ApiProperty({
        example: 'Fulano', 
        description: "Primeiro nome no perfil"
    })
    firstName?: string;

    @ApiProperty({
        example: 'Silva', 
        description: "Último nome no perfil"
    })
    lastName?: string;

    @ApiProperty({
        example: '000.000.000-00', 
        description: "CPF do usuário"
    })
    cpf?: string;

    @ApiProperty({
        example: '00/00/0000', 
        description: "Data de nascimento do usuário"
    })
    birthDate?: string;

    @ApiProperty({
        example: '+55', 
        description: "DDD do telefone do usuário"
    })
    ddd?: string;

    @ApiProperty({
        example: '(00) 0 0000-0000', 
        description: "Telefone do usuário"
    })
    phone?: string;
    
    @ApiProperty({
        example: 'MASCULINO', 
        description: "Gênero do usuário"
    })
    genero?: Genero;

    @ApiProperty({
        example: 'Fulano', 
        description: "Id do usuário para garantir o relacionamento de perfil com usuário"
    })
    userId?: string;
}
