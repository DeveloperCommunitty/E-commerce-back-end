import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  UploadedFiles,
} from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ProductsDto } from './dto/produtos.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UpdateProductsDto } from './dto/produtos.update.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProdutosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async create(
    @Body() body: ProductsDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const { name, description, price, stock, sku } = body;

    const nameUnique = await this.prisma.products.findFirst({
      where: {
        name: name,
      },
    });

    if (nameUnique)
      throw new HttpException(`O produto já existe`, HttpStatus.CONFLICT);

    const skuUnique = await this.prisma.products.findFirst({
      where: {
        sku: sku,
      },
    });

    if (skuUnique)
      throw new HttpException(
        `O código do produto já existe`,
        HttpStatus.CONFLICT,
      );

    let imageResults: any[];
    if (files && files.length > 0 && !nameUnique && !skuUnique) {
      imageResults = await Promise.all(
        files.map((file) => this.cloudinary.uploadImage(file)),
      );
    } else {
      throw new HttpException(
        'Nenhum arquivo enviado ou produto existente',
        HttpStatus.NOT_FOUND,
      );
    }

    const product = await this.prisma.products.create({
      data: {
        name,
        description,
        price,
        stock,
        sku,
        imagemUrl: imageResults
          .map((element: { url: any }) => element.url)
          .join(', '),
        publicId: imageResults
          .map((element: { public_id: any }) => element.public_id)
          .join(', '),
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        sku: true,
        stock: true,
        imagemUrl: true,
      },
    });

    if (!product)
      throw new HttpException(
        `Erro ao criar produto`,
        HttpStatus.EXPECTATION_FAILED,
      );

    return product;
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, pageSize } = paginationDto;
    const offset = (page - 1) * pageSize;

    const productsAll = await this.prisma.products.findMany({
      skip: offset,
      take: pageSize,
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        sku: true,
        stock: true,
        imagemUrl: true,
      },
    });

    const totalProducts = await this.prisma.products.count();

    if (!productsAll)
      throw new HttpException(
        `Erro ao listar produtos`,
        HttpStatus.EXPECTATION_FAILED,
      );

    return {
        data: productsAll,
        totalPages: Math.ceil(totalProducts / pageSize),
        currentPage: page,
    };
  }

  async update(
    @Body() id: string,
    body: UpdateProductsDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const { name, description, price, stock, sku, statusEstoque } = body;

    const existsProduct = await this.prisma.products.findUnique({
      where: { id },
    });

    if (!existsProduct)
      throw new HttpException(`Produto inexistente`, HttpStatus.NOT_FOUND);

    const skuUnique = await this.prisma.products.findFirst({
      where: {
        sku: sku,
        id: { not: id },
      },
    });

    if (skuUnique)
      throw new HttpException(
        `O código do produto não pertence a este ID`,
        HttpStatus.CONFLICT,
      );

    if (existsProduct.publicId && files && files.length > 0) {
      const publicIds = existsProduct.publicId.split(', ');

      await Promise.all(
        publicIds.map(async (publicId) => {
          try {
            await this.cloudinary.destroy(publicId);
            console.log(`Imagem ${publicId} apagada com sucesso.`);
          } catch (error) {
            throw new HttpException(
              `Erro ao apagar a imagem ${publicId}: ${error.message}`,
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
        }),
      );

      let imageResults: any[];
      imageResults = await Promise.all(
        files.map((file) => this.cloudinary.uploadImage(file)),
      );
      const product = await this.prisma.products.update({
        where: {
          id,
        },
        data: {
          name,
          description,
          price,
          stock: { increment: stock },
          statusEstoque,
          sku,
          imagemUrl: imageResults
            .map((element: { url: any }) => element.url)
            .join(', '),
          publicId: imageResults
            .map((element: { public_id: any }) => element.public_id)
            .join(', '),
        },
      });

      if (!product)
        throw new HttpException(
          `Erro ao atualizar produto`,
          HttpStatus.EXPECTATION_FAILED,
        );

      return product;
    } else {
      const product = await this.prisma.products.update({
        where: {
          id,
        },
        data: {
          name,
          description,
          price,
          stock: { increment: stock },
          statusEstoque,
          sku,
        },
      });

      if (!product)
        throw new HttpException(
          `Erro ao atualizar produto`,
          HttpStatus.EXPECTATION_FAILED,
        );

      return product;
    }
  }

  async findOne(id: string) {
    const product = await this.prisma.products.findUnique({ where: { id } });

    if (!product)
      throw new HttpException(`Produto inexistente`, HttpStatus.NOT_FOUND);

    return product;
  }

  async destroy(id: string) {
    const product = await this.prisma.products.findUnique({ where: { id } });

    if (!product)
      throw new HttpException(`Produto inexistente`, HttpStatus.NOT_FOUND);

    if (product.publicId) {
      const publicIds = product.publicId.split(', ');

      await Promise.all(
        publicIds.map(async (publicId) => {
          try {
            await this.cloudinary.destroy(publicId);
          } catch (error) {
            console.error(`Erro ao apagar a imagem ${publicId}:`, error);
          }
        }),
      );
    }

    await this.prisma.products.delete({
      where: { id },
    });

    return {
      message: 'Produto deletado com sucesso',
      status: HttpStatus.NO_CONTENT,
    };
  }
}
