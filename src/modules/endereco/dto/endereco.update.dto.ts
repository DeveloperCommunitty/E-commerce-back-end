import { IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  neighbourhood?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  zipCode?: string;

  @IsOptional()
  @IsString()
  publicPlace?: string;

  @IsOptional()
  @IsString()
  streetNumber?: string;

  @IsOptional()
  userId?: string; // ID do usuário correspondente
}
