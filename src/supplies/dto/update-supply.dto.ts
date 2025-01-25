import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplyDto } from './create-supply.dto';
import { Transform } from 'class-transformer';
import { Unit } from '../types/unit.enum';

export class UpdateSupplyDto extends PartialType(CreateSupplyDto) {
  @IsOptional()
  @IsString()
  @Length(3, 120)
  @Transform(({ value }) => value.toLowerCase())
  name?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  stock?: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @IsEnum(Unit)
  unit?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  state?: number;
}
