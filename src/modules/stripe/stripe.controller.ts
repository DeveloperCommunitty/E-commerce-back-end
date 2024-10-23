import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { checkoutDto } from './dto/stripe.create.dto';
import { StripeService } from './stripe.service';

@ApiTags('Payments')
@Controller('create-session')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a payment session based on the provided cart and user information.' })
  @ApiResponse({
    status: 201,
    description: 'Payment session created successfully.',
    schema: {
      example: {
        sessionId: 'cs_test_a1b2c3d4e5f6g7h8',
        url: 'https://checkout.stripe.com/pay/cs_test_a1b2c3d4e5f6g7h8',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request. Missing or invalid parameters.' })
  @ApiBody({ type: checkoutDto })
  async createPaymentIntent(@Body() checkoutDto: checkoutDto) {
    return this.stripeService.createPaymentIntent(checkoutDto);
  }
}
