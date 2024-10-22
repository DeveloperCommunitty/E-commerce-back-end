import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/database/PrismaService';
import Stripe from 'stripe';

@Injectable()
export class StripeWebhookService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15' as any,
    });
  }

  async handleEvent(event: Stripe.Event) {
    try {
      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object as Stripe.Checkout.Session;

          if (session.payment_status === 'paid') {
            const userId = session.client_reference_id;

            const cartSale = await this.prisma.carts.findFirst({
              where: {
                userId: userId,
                status: 'PENDENTE',
                sessionId: session.id,
              },
              include: { CartItems: { include: { products: true } } },
            });

            if (!cartSale) {
              return {
                status: HttpStatus.NOT_FOUND,
                message: 'Carrinho não encontrado.',
              };
            }

            await Promise.all(
              cartSale.CartItems.map(async (item) => {
                const product = await this.prisma.products.findUnique({
                  where: { id: item.productId },
                });

                if (!product) {
                  throw new Error(
                    `Produto não encontrado com ID: ${item.productId}`,
                  );
                }

                const newStockAmount = product.stock - item.quantity;

                await this.prisma.products.update({
                  where: { id: item.productId },
                  data: {
                    stock: newStockAmount,
                    statusEstoque:
                      newStockAmount === 0
                        ? 'ESGOTADO' //
                        : 'DISPONIVEL',
                  },
                });
              }),
            );

            await this.prisma.carts.update({
              where: { id: cartSale.id },
              data: {
                status: 'PAGO',
                paymentId: session.payment_intent as string,
              },
            });
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
