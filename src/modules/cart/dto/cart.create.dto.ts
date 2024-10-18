import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreateCartItemDTO {
  productId: string;
  quantity: number;
}

export class CreateCartDTO {
  @ApiProperty({
    example: '9e8962e8-9e27-4fce-905c-3eb27618be29',
    description: 'Id do usuário',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example: [
      { productId: 'df1a5d9b-a775-44e2-a2e3-384d99e14c78', quantity: 4 },
      { productId: '4168018f-1f8c-4a80-af4e-2ad9cb871a7f', quantity: 1 },
    ],
    description: 'Arrays em um objeto contendo id do produto e quantidade',
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCartItemDTO)
  products: CreateCartItemDTO[];
}
