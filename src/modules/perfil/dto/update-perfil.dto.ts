import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-perfil.dto';
import { $Enums } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    @ApiProperty({
        example: 'Fulano'
    })
    firstName?: string;

    @ApiProperty({
        example: 'Silva'
    })
    lastName?: string;

    @ApiProperty({
        example: '000.000.000-00'
    })
    cpf?: string;

    @ApiProperty({
        example: '00/00/0000'
    })
    birthDate?: string;

    @ApiProperty({
        example: '+55'
    })
    ddd?: string;

    @ApiProperty({
        example: '(00) 0 0000-0000'
    })
    phone?: string;
    
    @ApiProperty({
        example: 'MASCULINO'
    })
    genero?: $Enums.Genero;

    @ApiProperty({
        example: 'Fulano'
    })
    userId?: string;
}
