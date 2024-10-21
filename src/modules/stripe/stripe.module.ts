import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { StripeWebhookModule } from './webhook/stripe-webhook.module';

@Module({
  imports: [StripeWebhookModule],
  controllers: [StripeController],
  providers: [StripeService, PrismaService],
})
export class StripeModule {}
