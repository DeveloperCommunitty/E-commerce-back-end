import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
// import { UsersModule } from './users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    // UsersModule,
    ConfigModule, 
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('TOKEN_ENV'), 
        signOptions: { expiresIn: '43200s' },
      }),
      inject: [ConfigService], 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
