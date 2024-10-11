import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/skipAuth/skipAuth';
import { AuthService } from './auth.service';
import { AuthDto } from './authDto/authDto';

@ApiTags('Login')
@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login do usuário e retorno do token de acesso.' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 401, description: 'Token Inválido!' })
  @Post()
  @Public()
  async signIn(@Body() auth: AuthDto) {
    return await this.authService.signIn(auth.email, auth.password);
  }

}
