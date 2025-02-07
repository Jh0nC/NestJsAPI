import { PartialType } from '@nestjs/mapped-types';
import { CreateProductCategoryDto } from './create-product-category.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateProductCategoryDto extends PartialType(
  CreateProductCategoryDto,
) {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  description?: string;
}
