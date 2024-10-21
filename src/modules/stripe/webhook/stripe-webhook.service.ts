import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeWebhookService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15' as any,
    });
  }

  handleEvent(event: Stripe.Event) {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Pagamento bem-sucedido:', paymentIntent.id);

        break;
      case 'payment_intent.payment_failed':
        const failedIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Pagamento falhou:', failedIntent.id);
        break;
      default:
        console.log(`Evento não tratado: ${event.type}`);
    }
  }

  constructEventFromPayload(signature: string, payload: Buffer) {
    try {
      const endpointSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
      return this.stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret,
      );
    } catch (error) {
      throw new Error(`Erro ao validar o evento do Stripe: ${error.message}`);
    }
  }
}
