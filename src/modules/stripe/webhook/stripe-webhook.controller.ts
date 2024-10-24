import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Public } from 'src/auth/skipAuth/skipAuth';
import { StripeWebhookService } from './stripe-webhook.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('webhook')
export class StripeWebhookController {
  constructor(private readonly stripeWebhookService: StripeWebhookService) {}

  @Post()
  @Public()
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    const signature = req.headers['stripe-signature'];

    if (!signature) {
      console.error('Assinatura Stripe ausente!');
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send('Stripe signature missing');
    }

    let event: any;

    try {
      event = this.stripeWebhookService.constructEventFromPayload(
        signature as string,
        req.body,
      );
    } catch (error) {
      console.error(`Erro ao validar webhook: ${error.message}`);
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send(`Webhook Error: ${error.message}`);
    }

    this.stripeWebhookService.handleEvent(event);

    res.status(HttpStatus.OK).send();
  }
}
