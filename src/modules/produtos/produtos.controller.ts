import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CheckPolicies } from 'src/casl/guards/policies.check';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/casl/casl-ability.factory/actionDto/casl-action.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsDto } from './dto/produtos.dto';

@ApiTags('Produto')
@Controller('produto')
export class ProdutosController {
    constructor(private readonly productsService: ProdutosService){}

    @ApiOperation({ summary: 'Lista todos os produtos.' })
    @ApiResponse({ status: 204})  
    @ApiResponse({ status: 404, description: 'Erro ao listar produtos' })
    @Get('produtos')
    findAll(){
        return this.productsService.findAll();
    }

    @ApiOperation({ summary: 'Cria produto' }) 
    @ApiResponse({ status: 204})  
    @ApiResponse({ status: 417, description: 'O produto já existe!' })  
    @ApiResponse({ status: 417, description: 'Erro ao criar produto' })  
    @Post()
    @ApiBearerAuth()
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
    create(@Body() body: ProductsDto){
        return this.productsService.create(body);
    }

    @ApiOperation({ summary: 'Atualiza dados do produto' }) 
    @ApiParam({ name: 'id', description: 'Id do produto'})
    @ApiResponse({ status: 404, description: 'Produto inexistente!' })  
    @ApiResponse({ status: 417, description: 'Nome do produto já está cadastrado!' })  
    @ApiResponse({ status: 417, description: 'Erro ao atualizar produto' })  
    @Put()
    @ApiBearerAuth()
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
    update(@Param('id') id: string, @Body() body: ProductsDto){
        return this.productsService.update(id, body);
    }

    @ApiOperation({ summary: 'Lista produto por Id' }) 
    @ApiParam({ name: 'id', description: 'Id do produto'}) 
    @ApiResponse({ status: 404, description: 'Produto inexistente!' })  
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.productsService.findOne(id);
    }

    @ApiOperation({ summary: 'Deleta produto por Id' }) 
    @ApiParam({ name: 'id', description: 'Id do produto'}) 
    @ApiResponse({ status: 204})  
    @ApiResponse({ status: 404, description: 'Produto inexistente!' })  
    @ApiResponse({ status: 417, description: 'Erro ao atualizar produto' })  
    @Delete(':id')
    @ApiBearerAuth()
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Admin, 'all'))
    destroy(@Param('id') id: string){
        return this.productsService.destroy(id);
    }

}
