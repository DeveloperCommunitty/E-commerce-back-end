import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateCartDTO } from './dto/cart.create.dto';
import { Cron } from '@nestjs/schedule';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async create(@Body() body: CreateCartDTO) {
    const { userId, products } = body;

    const productsByDatabase = await this.prisma.products.findMany({
      where: { id: { in: products.map((p) => p.productId) } },
    });

    if (productsByDatabase.length === 0) {
      throw new HttpException(
        'Nenhum produto encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    let total = 0;
    const productQuantity = [];

    for (const product of productsByDatabase) {
      const quantity =
        products.find((p) => p.productId === product.id)?.quantity || 0;

      if (product.isLocked) {
        const lockExpired =
          product.lockedAt && product.lockDuration
            ? new Date() >
              new Date(
                product.lockedAt.getTime() + product.lockDuration * 60000,
              )
            : false;

        if (!lockExpired) {
          throw new HttpException(
            `Produto ${product.name} está temporariamente indisponível para adição ao carrinho. Por favor, tente novamente mais tarde.`,
            HttpStatus.BAD_REQUEST,
          );
        }

        await this.prisma.products.update({
          where: { id: product.id },
          data: { isLocked: false, lockedAt: null, lockDuration: null },
        });
      }

      if (product.stock === 0) {
        throw new HttpException(
          `Produto ${product.name} está esgotado.`,
          HttpStatus.BAD_REQUEST,
        );
      }

      if (quantity > product.stock) {
        throw new HttpException(
          `Produto ${product.name} não possui estoque suficiente. Você tentou adicionar ${quantity}, mas apenas ${product.stock} estão disponíveis.`,
          HttpStatus.BAD_REQUEST,
        );
      }

      if (quantity === product.stock) {
        const lockDurationInMinutes = 60;

        await this.prisma.products.update({
          where: { id: product.id },
          data: {
            isLocked: true,
            lockedAt: new Date(),
            lockDuration: lockDurationInMinutes,
          },
        });
      }

      total += product.price * quantity;
      productQuantity.push({ ...product, quantity });
    }

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

  @Cron('*/5 * * * *')
  async unlockExpiredProducts() {
    const now = new Date();
    console.log(now);

    const expiredLockedProducts = await this.prisma.products.findMany({
      where: {
        isLocked: true,
        lockedAt: {
          not: null,
        },
        lockDuration: {
          not: null,
        },
      },
    });

    for (const product of expiredLockedProducts) {
      const lockExpirationTime = new Date(
        product.lockedAt.getTime() + product.lockDuration * 60000,
      );

      if (now > lockExpirationTime) {
        await this.prisma.products.update({
          where: { id: product.id },
          data: {
            isLocked: false,
            lockedAt: null,
            lockDuration: null,
          },
        });
      }
    }
  }

  async findAllUsers(paginationDto: PaginationDto) {
    const { page, pageSize } = paginationDto;
    const offset = (page - 1) * pageSize;

    const carts = await this.prisma.carts.findMany({
      skip: offset,
      take: pageSize,
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

    const totalCarts = await this.prisma.carts.count();

    return {
      data: carts,
      totalPages: Math.ceil(totalCarts / pageSize),
      currentPage: page,
    };
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
