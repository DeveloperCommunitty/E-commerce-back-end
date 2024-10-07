import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
// import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    // private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<{ access_token: string }> {

    const user = await this.userService.findOne(email, password);

    if (!user) {
        throw new UnauthorizedException();
    }
    const payload = { userEmail: user.email, userName: user.id };
    
    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) throw new BadRequestException('Falha de autenticação.')

    return {
        access_token: await this.jwtService.signAsync(payload),
    };
  }
  
}

