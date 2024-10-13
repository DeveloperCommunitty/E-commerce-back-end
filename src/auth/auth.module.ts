import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from '../modules/usuario/usuario.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuarioService } from 'src/modules/usuario/usuario.service';
import { PrismaService } from 'src/database/PrismaService';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    UsuarioModule,
    CaslModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: async () => ({
        secret: process.env.JWT_SECRET, 
        signOptions: { expiresIn: '43200s' }, 
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UsuarioService],
})

export class AuthModule {}
