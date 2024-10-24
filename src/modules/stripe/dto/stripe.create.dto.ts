import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class checkoutDto {
  @ApiProperty({
    example: 'ae01dce2-6af6-4a7c-93f3-43ad30213714',
    description: 'O ID do usuário que inicia o pagamento.',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'd998f58f-3cc9-4874-8612-879243f325c34',
    description: 'O ID do carrinho associado ao pagamento.',
  })
  @IsNotEmpty()
  @IsString()
  cartId: string;
}
