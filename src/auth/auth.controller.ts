import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './authDto/authDto';
import { Public } from 'src/auth/skipAuth/skipAuth';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Login') 
@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login do usuário e retorno do token de acesso.' })
  @HttpCode(HttpStatus.OK)
  @Post()
  @Public()
  async signIn(@Body() auth: AuthDto) {
    return await this.authService.signIn(auth.email, auth.password);
  }

}

