import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
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
    @Type(() => Number) 
    price: number;
    @ApiProperty({ example: '20', description: 'Quantidade no estoque' })
    @IsNotEmpty({message: 'Digite a quantidade no estoque!'})
    @Type(() => Number) 
    stock: number;
    @ApiProperty()
    @IsNotEmpty()
    @ApiProperty({ example: 'SOK-300', description: 'Código de indetificaçao único' })
    sku: string;
    @ApiProperty({ example: 'capinha.png', description: 'Imagem do produto' })
    imagemUrl: string;
}