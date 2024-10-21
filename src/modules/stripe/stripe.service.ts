import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import Stripe from 'stripe';
import { checkoutDto } from './dto/stripe.create.dto';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15' as any,
    });
  }

  async createPaymentIntent(checkoutDto: checkoutDto) {
    const { cartId, userId } = checkoutDto;

    try {
      const cartItems = await this.prisma.cartItems.findMany({
        where: { cartId },
        include: { products: true },
      });

      if (cartItems.length === 0) {
        throw new Error('O carrinho está vazio.');
      }

      const lineItems = cartItems.map((item) => ({
        price_data: {
          currency: 'brl',
          product_data: {
            name: item.products.name,
          },
          unit_amount: Math.round(item.products.price * 100),
        },
        quantity: item.quantity,
      }));

      const session = await this.stripe.checkout.sessions.create({
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: lineItems,
        success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/checkout/cancel`,
        client_reference_id: userId,
        metadata: userId ? { userId } : {},
      });

      return { sessionId: session.id, url: session.url };
    } catch (error) {
      throw new Error(`Erro ao criar sessão de checkout: ${error.message}`);
    }
  }
}
