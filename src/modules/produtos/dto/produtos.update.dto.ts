import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, Length } from 'class-validator';

export enum StatusEstoque {
  DISPONIVEL = 'DISPONIVEL',
  ESGOTADO = 'ESGOTADO',
}

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
    example: 'DISPONIVEL',
    description: 'Status atual do estoque do produto',
    enum: StatusEstoque, // Aqui mostramos o enum no Swagger
  })
  @IsEnum(StatusEstoque, {
    message:
      'O status deve ser um valor válido: Disponível, Esgotado ou Limitado',
  }) // Valida o enum
  @IsNotEmpty({ message: 'Digite o status do estoque!' })
  statusEstoque: StatusEstoque;

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
