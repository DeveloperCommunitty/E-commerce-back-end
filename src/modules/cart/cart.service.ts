import { Body, Injectable, Param, Req } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateCartDTO } from './dto/cart.create.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) { }

  async create(@Body() body: CreateCartDTO) {
    const {
      userId,
      products
    } = body;

    const productsByDatabase = await this.prisma.products.findMany({
      where: { id: { in: products.map(p => p.productId) } },
    });

    if (productsByDatabase.length === 0) {
      throw new Error('Nenhum produto encontrado');
    }

    let total = 0;
    const productQuantity = productsByDatabase.map(product => {
      const quantity = products.find(p => p.productId === product.id)?.quantity || 0;
      total += product.price * quantity;
      return { ...product, quantity };
    });

    const sessionId = ''
    const paymentId = ''

    const cart = await this.prisma.carts.create({
      data: {
        paymentId,
        sessionId,
        total,
        userId,
      },
      select: {
        id: true,
        sessionId: true,
        paymentId: true,
        status: true,
        userId: true,
        total: true,
      }
    });

    const cartItems = productQuantity.map(product => ({
      quantity: product.quantity,
      subTotal: product.price * product.quantity,
      cartId: cart.id,
      productId: product.id,
    }));

    await this.prisma.cartItems.createMany({
      data: cartItems,
    });

    return cart;
  }

  async findAll(@Param() id: string){
    const cart = await this.prisma.carts.findMany({
      where:{
        userId: id,
      },
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        sessionId: true,
        paymentId: true,
        status: true,
        userId: true,
        total: true,
        CartItems: true
      },
    });

    return cart;

  }

  



}
