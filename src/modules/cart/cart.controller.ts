import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDTO } from './dto/cart.create.dto';

@Controller('carrinho')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() body: CreateCartDTO){
    return this.cartService.create(body);
  }

  @Get()
  async findAll(@Param() id: string){
    return this.cartService.findAll(id);
  }


}
