import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StripeWebhookController } from './stripe-webhook.controller';
import { StripeWebhookService } from './stripe-webhook.service';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  imports: [ConfigModule],
  controllers: [StripeWebhookController],
  providers: [StripeWebhookService, PrismaService],
})
export class StripeWebhookModule {}
