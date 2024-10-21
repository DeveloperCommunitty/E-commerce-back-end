import { Body, Controller, Post } from '@nestjs/common';
import { checkoutDto } from './dto/stripe.create.dto';
import { StripeService } from './stripe.service';

@Controller('create-session')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  async createPaymentIntent(@Body() checkoutDto: checkoutDto) {
    return this.stripeService.createPaymentIntent(checkoutDto);
  }
}
