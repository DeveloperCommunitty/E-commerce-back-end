import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { checkoutDto } from './dto/stripe.create.dto';
import { StripeService } from './stripe.service';

@ApiTags('Pagamentos')
@Controller('create-session')
@ApiBearerAuth('access_token')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  @ApiOperation({
    summary:
      'Crie uma sessão de pagamento com base no carrinho fornecido e nas informações do usuário.',
  })
  @ApiResponse({
    status: 201,
    description: 'Sessão de pagamento criada com sucesso.',
    schema: {
      example: {
        sessionId:
          'cs_test_a12PgSJ97LFUWuzEz9ZH533BKV9lIAvXTxYIp1b5inBorEwjjV1j9VEZe6',
        url: 'https://checkout.stripe.com/c/pay/cs_test_a12PgSJ97LFUWuzEz9ZH533BKV9lIAvXTxYIp1b5inBorEwjjV1j9VEZe6#fidkdWxOYHwnPyd1blpxYHZxWjA0VEdUZj1Af1x2STdBMGNEV3dyQzxff20zV0x0cDFtbzJjcHZGSDdVSWAxYWBuZ2NPYW1PdE9sRm1rcVVhMm1CS291N2NOSldIYVdWfWpmXUpvVTM0NU5pNTVBc0JAcj0yTicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros ausentes ou inválidos.',
  })
  @ApiBody({ type: checkoutDto })
  async createPaymentIntent(@Body() checkoutDto: checkoutDto) {
    return this.stripeService.createPaymentIntent(checkoutDto);
  }
}
