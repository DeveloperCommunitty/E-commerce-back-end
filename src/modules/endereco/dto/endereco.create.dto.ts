import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({ example: 'Rua das Flores', description: 'Nome da rua do endereço' })
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({ example: 'Centro', description: 'Nome do bairro', required: false })
  @IsOptional()
  @IsString()
  neighbourhood?: string;

  @ApiProperty({ example: 'São Paulo', description: 'Nome da cidade' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ example: '01000-000', description: 'Código postal (CEP)' })
  @IsNotEmpty()
  @IsString()
  zipCode: string;

  @ApiProperty({ example: 'Residencial', description: 'Tipo de local público, como praça ou avenida', required: false })
  @IsOptional()
  @IsString()
  publicPlace?: string;

  @ApiProperty({ example: '1234', description: 'Número do endereço', required: false })
  @IsOptional()
  @IsString()
  streetNumber?: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID do usuário correspondente' })
  @IsNotEmpty()
  userId: string;
}
