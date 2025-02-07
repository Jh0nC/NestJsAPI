import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  ValidateNested,
} from 'class-validator';

class UpdateRequestDetailDto {
  @IsNumber()
  @IsPositive()
  product: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}

export class UpdateRequestDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  state?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  total?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateRequestDetailDto)
  details?: UpdateRequestDetailDto[];
}
