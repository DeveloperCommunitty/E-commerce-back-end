import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from 'src/modules/usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(email);

    const payload = {
      userEmail: user.user.email,
      userName: user.user.id,
      role: user.user.role,
    };

    const passwordCorrect = await bcrypt.compare(password, user.user.password);

    if (!passwordCorrect)
      throw new BadRequestException({
        message: 'Falha de autenticação.',
        error: 'Credenciais inválidas',
      });

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
