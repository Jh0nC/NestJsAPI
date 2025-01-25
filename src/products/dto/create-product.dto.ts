import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

class CreateProductDetailDto {
  @IsNumber()
  @IsPositive()
  supply: number;
}

export class CreateProductDto {
  @IsString()
  @Length(5, 200)
  name: string;

  @IsNumber()
  @IsPositive()
  category: number;

  @IsString()
  @Length(1, 300)
  description: string;

  @IsString()
  @Length(1, 1000)
  image: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDetailDto)
  details: CreateProductDetailDto[];
}
