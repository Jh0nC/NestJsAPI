import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class UpdateBoughtDetailDto {
  @IsNumber()
  @IsPositive()
  supply: number;

  @IsNumber()
  @IsPositive()
  amount: number;
}

export class UpdateBoughtDto {
  @IsOptional()
  @IsString()
  @Length(1, 200)
  bill?: string;

  @IsOptional()
  @IsDateString()
  date?: Date;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  total?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateBoughtDetailDto)
  details?: UpdateBoughtDetailDto[];
}
