import { ApiProperty } from "@nestjs/swagger";

export class User {
    @ApiProperty({ example: 1, description: 'O ID do usuário' })
    id: number;
    @ApiProperty({ example: 'admin', description: 'Papel do usuário no sistema' })
    Role: boolean;
}

export enum Action {
    Admin = 'manage',
    User = 'read',
}