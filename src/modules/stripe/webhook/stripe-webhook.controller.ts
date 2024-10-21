import { Body, Controller, Headers, Post, Req } from '@nestjs/common';
import { RequestWithRawBody } from 'src/middleware/raw-body';
import { StripeWebhookService } from './stripe-webhook.service';

@Controller('webhook')
export class StripeWebhookController {
  constructor(private readonly stripeWebhookService: StripeWebhookService) {}

  @Post()
  async handleWebhook(
    @Body() body: any,
    @Headers('stripe-signature') signature: string,
    @Req() request: RequestWithRawBody,
  ) {
    return this.stripeWebhookService.handleEvent(body, signature, request);
  }
}
