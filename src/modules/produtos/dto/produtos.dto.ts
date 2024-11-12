import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, Length } from 'class-validator';

export enum ProductCategories {
  RECOMENDADOS = 'RECOMENDADOS',
  MAIS_VENDIDOS = 'MAIS_VENDIDOS',
  MAIS_PROCURADOS = 'MAIS_PROCURADOS',
}

export class ProductsDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    description: 'Imagens do produto (arquivos)',
    example: ['image1.png', 'image2.jpg'],
  })
  files: Express.Multer.File[];

  @ApiProperty({ example: 'Capinha celular', description: 'Nome do produto' })
  @IsNotEmpty({ message: 'Digite um nome!' })
  @Length(5, 100)
  name: string;

  @ApiProperty({
    example: 'Cor preta, para celular de marca x',
    description: 'Características do produto',
  })
  @IsNotEmpty({ message: 'Digite uma descrição!' })
  @Length(10, 100)
  description: string;

  @ApiProperty({ example: '120', description: 'Valor do produto' })
  @IsNotEmpty({ message: 'Digite um preço!' })
  @Type(() => Number)
  price: number;

  @ApiProperty({ example: '20', description: 'Quantidade no estoque' })
  @IsNotEmpty({ message: 'Digite a quantidade no estoque!' })
  @Type(() => Number)
  stock: number;

  @ApiProperty()
  @IsNotEmpty()
  @ApiProperty({
    example: 'SOK-300',
    description: 'Código de indetificaçao único',
  })
  sku: string;
  @ApiProperty({
    example: 'RECOMENDADOS',
    description: 'Selecione a categoria do produto',
    enum: ProductCategories,
  })
  category: ProductCategories;
}
