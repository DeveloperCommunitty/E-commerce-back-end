export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export class User{
    id: string;
    email: string;
    name: string;
    password: string;
}