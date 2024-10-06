import { Module } from '@nestjs/common';
import { ProfileService } from './perfil.service';
import { ProfileController } from './perfil.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService],
})
export class ProfileModule {}
