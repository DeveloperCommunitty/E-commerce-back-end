import { IsNotEmpty, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCartItemDTO {
    productId: string; 
    quantity: number;  
}

export class CreateCartDTO {
    @IsString()
    userId: string; 
  
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateCartItemDTO)
    products: CreateCartItemDTO[]; 

}
  
