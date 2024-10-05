export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export type CadastroDTO = {
  email: string;
  name: string;
  password: string;
  avatar: string;
  avatarId: string;
  role: Role;
};
