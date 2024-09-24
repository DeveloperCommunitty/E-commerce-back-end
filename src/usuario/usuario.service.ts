import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioService {
  getHello(): string {
    return 'Hello World na parte de Usuários';
  }
}
