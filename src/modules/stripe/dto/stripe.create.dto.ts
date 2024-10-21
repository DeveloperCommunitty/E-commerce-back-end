import { IsNotEmpty, IsString } from 'class-validator';

export class checkoutDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  cartId: string;
}
