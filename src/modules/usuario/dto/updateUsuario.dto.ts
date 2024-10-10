import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUsuarioDto } from './createUsuario.dto';


export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
}
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @ApiProperty({
        example: 'Fulano'
    })
    name?: string;

    @ApiProperty({
        example: 'fulano@example.com'
    })
    email?: string;

    @ApiProperty({
        example: 'senha123'
    })
    password?: string;

    @ApiProperty({
        example: 'avatar.png'
    })
    avatar?: string;

    @ApiProperty({
        example: '12345'
    })
    avatarId?: string;

    @ApiProperty({
        example: 'USER'
    })
    role?: Role;
}
