import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class UpdateProductDetailDto {
  @IsNumber()
  @IsPositive()
  supply: number;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @Length(5, 200)
  name?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  category?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  state?: number;

  @IsOptional()
  @IsString()
  @Length(1, 300)
  description?: string;

  @IsOptional()
  @IsString()
  @Length(1, 1000)
  image?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  stock?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductDetailDto)
  details?: UpdateProductDetailDto[];
}
