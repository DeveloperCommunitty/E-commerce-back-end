import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class ProductsDto {
    @ApiProperty({ example: 'Capinha celular', description: 'Nome do produto' })
    @IsNotEmpty({message: 'Digite um nome!'})
    @Length(5, 100)
    name: string;
    @ApiProperty({ example: 'Cor preta, para celular de marca x', description: 'Características do produto' })
    @IsNotEmpty({message: 'Digite uma descrição!'})
    @Length(10, 100)
    description: string;
    @ApiProperty({ example: '120', description: 'Valor do produto' })
    @IsNotEmpty({message: 'Digite um preço!'})
    price: number;
    @ApiProperty({ example: '20', description: 'Quantidade no estoque' })
    @IsNotEmpty({message: 'Digite a quantidade no estoque!'})
    stock: number;
    @ApiProperty()
    @IsNotEmpty()
    sku: string;
    @ApiProperty({ example: 'https:imagem-capinha-celular-exemplo.png', description: 'Imagem do produto' })
    @IsNotEmpty()
    imagemUrl: string;
    @ApiProperty()
    @IsNotEmpty()
    publicId: string;
}