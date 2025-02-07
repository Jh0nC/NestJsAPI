import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsPositive, ValidateNested } from 'class-validator';

class CreateRequestDetailDto {
  @IsNumber()
  @IsPositive()
  product: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}

export class CreateRequestDto {
  @IsNumber()
  @IsPositive()
  user: number;

  @IsNumber()
  @IsPositive()
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRequestDetailDto)
  details: CreateRequestDetailDto[];
}
