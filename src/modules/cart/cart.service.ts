import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Param,
} from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateCartDTO } from './dto/cart.create.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async create(@Body() body: CreateCartDTO) {
    const { userId, products } = body;

    const productsByDatabase = await this.prisma.products.findMany({
      where: { id: { in: products.map((p) => p.productId) } },
    });

    if (productsByDatabase.length === 0) {
      throw new Error('Nenhum produto encontrado');
    }

    let total = 0;
    const productQuantity = productsByDatabase.map((product) => {
      const quantity =
        products.find((p) => p.productId === product.id)?.quantity || 0;
      total += product.price * quantity;
      return { ...product, quantity };
    });

    const sessionId = '';
    const paymentId = '';

    const cart = await this.prisma.carts.create({
      data: {
        paymentId,
        sessionId,
        total,
        userId,
      },
      select: {
        id: true,
        status: true,
        userId: true,
        total: true,
      },
    });
    if (!cart)
      throw new HttpException('Erro ao criar carrinho', HttpStatus.BAD_REQUEST);

    const cartItems = productQuantity.map((product) => ({
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

  async findById(id: string) {
    const cart = await this.prisma.carts.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        status: true,
        total: true,
        userId: true,
        CartItems: {
          select: {
            id: true,
            quantity: true,
            productId: true,
          },
        },
      },
    });

    if (!cart)
      throw new HttpException('Carrinho não encontrado', HttpStatus.NOT_FOUND);

    return cart;
  }

  async findAllUsers() {
    const carts = await this.prisma.carts.findMany({
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        status: true,
        userId: true,
        total: true,
        CartItems: true,
      },
    });

    if (!carts)
      throw new HttpException(
        'Erro ao listar carrinhos',
        HttpStatus.BAD_REQUEST,
      );
    return carts;
  }

  async update(id: string) {
    const checkCart = await this.prisma.carts.findUnique({ where: { id } });
    if (!checkCart)
      throw new HttpException('Carrinho não encontrado', HttpStatus.NOT_FOUND);

    const updatedCart = await this.prisma.carts.update({
      where: {
        id,
      },
      data: {},
    });
    if (!updatedCart)
      throw new HttpException(
        'Erro ao atualizar carrinho',
        HttpStatus.BAD_REQUEST,
      );

    return updatedCart;
  }

  async destroy(id: string) {
    const checkCart = await this.prisma.carts.findUnique({ where: { id } });
    if (!checkCart)
      throw new HttpException('Carrinho não encontrado', HttpStatus.NOT_FOUND);

    if (checkCart.status == 'PAGO' || checkCart.status == 'CANCELADO')
      throw new HttpException(
        'O carrinho não pode ser deletado',
        HttpStatus.BAD_REQUEST,
      );

    const deletedItems = await this.prisma.cartItems.deleteMany({
      where: { cartId: checkCart.id },
    });
    if (!deletedItems)
      throw new HttpException(
        'Erro ao deletar carrinho',
        HttpStatus.BAD_REQUEST,
      );

    const updatedCart = await this.prisma.carts.update({
      where: {
        id,
      },
      data: {
        total: 0,
      },
    });
    if (!updatedCart)
      throw new HttpException(
        'Erro ao atualizar carrinho',
        HttpStatus.BAD_REQUEST,
      );

    return {
      message: 'Itens deletados com sucesso',
      cart: updatedCart,
    };
  }
}
