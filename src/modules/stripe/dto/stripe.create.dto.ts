import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class checkoutDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The ID of the user initiating the payment.' })
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The ID of the cart associated with the payment.' })
  cartId: string;
}
