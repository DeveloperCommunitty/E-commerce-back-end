import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, Length } from 'class-validator';

export class UpdateProductsDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    description: 'Imagens do produto (arquivos)',
    example: ['image1.png'],
    required: false,
  })
  files: Express.Multer.File[];

  @ApiProperty({
    example: 'Capinha celular',
    description: 'Nome do produto',
    required: false,
  })
  @IsOptional()
  @Length(5, 100)
  name: string;

  @ApiProperty({
    example: 'Cor preta, para celular de marca x',
    description: 'Características do produto',
    required: false,
  })
  @IsOptional()
  @Length(10, 100)
  description: string;

  @ApiProperty({
    example: '120',
    description: 'Valor do produto',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  price: number;

  @ApiProperty({
    example: '20',
    description: 'Quantidade no estoque',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  stock: number;

  @ApiProperty({
    example: 'SOK-300',
    description:
      'Código de identificação único. Deve ser passado para atualizar o produto.',
    required: true,
  })
  sku: string;
}
