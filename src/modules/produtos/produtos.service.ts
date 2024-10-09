import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ProductsDto } from './dto/produtos.dto';

@Injectable()
export class ProdutosService {
    constructor(private readonly prisma: PrismaService) {}

    async create(@Body() body: ProductsDto){
        const { name, description, price, stock, sku, imagemUrl, publicId } = body;

        const nameUnique = await this.prisma.products.findFirst({
            where:{
                name: name
            },
        });

        if (nameUnique) throw new HttpException(`O produto já existe!`, HttpStatus.EXPECTATION_FAILED);

        const product = await this.prisma.products.create({
            data: {
                name, 
                description, 
                price, 
                stock, 
                sku, 
                imagemUrl, 
                publicId 
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                sku: true,
                stock: true,
                createdAt: true
            }
        });

        if (!product) throw new HttpException(`Erro ao criar produto`, HttpStatus.EXPECTATION_FAILED);

        return product;
    }

    async findAll(){
        const productsAll = await this.prisma.products.findMany({
            select:{
                id: true,
                name: true,
                price: true,
                description: true,
                sku: true,
                stock: true,
                imagemUrl: true,
                publicId: true,
                CartItems: true,
                createdAt: true,
            }
        });

        if (!productsAll) throw new HttpException(`Erro ao listar produtos`, HttpStatus.EXPECTATION_FAILED,);

        return productsAll;
    }

    async update(@Body() id: string, body: ProductsDto){
        const { name, description, price, stock, sku, imagemUrl } = body;

        const existsProduct = await this.prisma.products.findUnique({where: {id}});

        if(!existsProduct) throw new HttpException(`Produto inexistente!`, HttpStatus.NOT_FOUND);

        const nameUnique = await this.prisma.products.findFirst({
            where:{
                name: name
            },
        });

        if (!nameUnique) throw new HttpException(`Nome do produto já está cadastrado!`, HttpStatus.EXPECTATION_FAILED);

        const product = await this.prisma.products.update({
            where:{
                id,
            },
            data:{
                name, 
                description, 
                price, 
                stock, 
                sku, 
                imagemUrl
            }
        });

        if (!product) throw new HttpException(`Erro ao atualizar produto`, HttpStatus.EXPECTATION_FAILED);

        return product;
    }

    async findOne(id: string){
        const product = await this.prisma.products.findUnique({where: {id}})

        if(!product) throw new HttpException(`Produto inexistente!`, HttpStatus.NOT_FOUND);

        return product;
    }

    async destroy(id: string){
        const product = await this.prisma.products.findUnique({where: {id}});

        if(!product) throw new HttpException(`Produto inexistente!`, HttpStatus.NOT_FOUND);
        
        await this.prisma.products.delete({
            where: {id}
        });

        throw new HttpException(
            `Produto deletado com sucesso`,
            HttpStatus.NO_CONTENT,
        );
    }

}
