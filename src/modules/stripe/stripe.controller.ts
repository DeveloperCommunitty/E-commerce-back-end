import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('payment-intent')
  async createPaymentIntent(
    @Body('amount') amount: number,
    @Body('currency') currency: string,
  ) {
    if (!amount || !currency) {
      throw new Error('Amount and currency are required.');
    }

    const paymentIntent = await this.stripeService.createPaymentIntent(amount, currency);
    return {
      clientSecret: paymentIntent.client_secret, 
    };
  }
}
