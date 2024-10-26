import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAddressDto {
  @ApiProperty({
    example: 'Rua das Flores',
    description: 'Nome da rua do endereço',
  })
  @IsString()
  street: string;

  @ApiProperty({
    example: 'Centro',
    description: 'Nome do bairro',
    required: false,
  })
  @IsOptional()
  @IsString()
  neighbourhood?: string;

  @ApiProperty({ example: 'São Paulo', description: 'Nome da cidade' })
  @IsString()
  city: string;

  @ApiProperty({ example: '01000-000', description: 'Código postal (CEP)' })
  @IsString()
  zipCode: string;

  @ApiProperty({
    example: 'Residencial',
    description: 'Tipo de local público, como praça ou avenida',
    required: false,
  })
  @IsOptional()
  @IsString()
  publicPlace?: string;

  @ApiProperty({
    example: '1234',
    description: 'Número do endereço',
    required: false,
  })
  @IsOptional()
  @IsString()
  streetNumber?: string;

  @ApiProperty({
    example: '768c43c7-2a84-4a30-aa37-b4cd3febecaf',
    description: 'ID do usuário correspondente',
  })
  userId: string;
}
