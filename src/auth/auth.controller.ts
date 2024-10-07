import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './AuthDto/AuthDto';
import { Public } from 'src/auth/skipAuth/SkipAuth';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

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


  @Get('token')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtém os dados presentes no token do usuário.' })
  getProfile(@Request() req) {
    return req.user;
  }


}

