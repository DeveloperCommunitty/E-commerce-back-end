import { ApiProperty } from "@nestjs/swagger";
import { Genero } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

export class CreateProfileDto {
    @ApiProperty({
        example: 'Fulano'
    })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({
        example: 'Silva'
    })
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({
        example: '000.000.000-00'
    })
    @IsNotEmpty()
    cpf: string;

    @ApiProperty({
        example: '00/00/0000'
    })
    @IsNotEmpty()
    birthDate: string;

    @ApiProperty({
        example: '+55'
    })
    ddd: string;

    @ApiProperty({
        example: '(00) 0 0000-0000'
    })
    phone: string;
    
    @ApiProperty({
        example: 'MASCULINO'
    })
    genero: Genero;

    @ApiProperty({
        example: 'Fulano'
    })
    userId: string;
}
