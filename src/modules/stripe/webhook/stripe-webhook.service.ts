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
    try {
      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object as Stripe.Checkout.Session;

          if (session.payment_status === 'paid') {
            const userId = session.client_reference_id;
            console.warn(userId);
            console.error(userId);
            console.log(session);
          } else {
            console.error('Pagamento ainda não concluído.');
          }
          break;

        case 'checkout.session.expired':
          const expiredSession = event.data.object as Stripe.Checkout.Session;
          console.warn(`Sessão de pagamento expirada: ${expiredSession.id}`);
          break;

        default:
          console.warn(`Evento não tratado: ${event.type}`);
      }
    } catch (error) {
      console.error(`Erro ao processar o evento ${event.type}:`, error.message);
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
