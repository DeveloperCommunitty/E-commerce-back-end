import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './AuthDto/AuthDto';
import { AuthGuard } from './auth.guard';
import { Public } from './skipAuth/skipAuth';
import { PoliciesGuard } from 'src/casl/guards/policies.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth') // Nome da tag usada no Swagger para agrupar os endpoints
@Controller('auth')
@UseGuards(PoliciesGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: 'Login do usuário e retorno do token de acesso.' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() auth: AuthDto) {
    return await this.authService.signIn(auth.email, auth.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtém o perfil do usuário' })
  getProfile(@Request() req) {
    return req.user;
  }


}

