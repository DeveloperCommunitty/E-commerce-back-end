import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';

@Module({
  controllers: [StripeController],
  providers: [StripeService, PrismaService],
})
export class StripeModule {}
