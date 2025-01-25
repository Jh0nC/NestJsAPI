import { Transform } from 'class-transformer';
import { IsEnum, IsString, Length } from 'class-validator';
import { Unit } from '../types/unit.enum';

export class CreateSupplyDto {
  @IsString()
  @Length(3, 120)
  @Transform(({ value }) => value.toLowerCase())
  name: string;

  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @IsEnum(Unit)
  unit: string;
}
