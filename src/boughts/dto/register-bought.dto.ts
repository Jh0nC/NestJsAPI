import {
  IsArray,
  IsDateString,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class RegisterBoughtDetailDto {
  @IsNumber()
  @IsPositive()
  supply: number;

  @IsNumber()
  @IsPositive()
  amount: number;
}

export class RegisterBoughtDto {
  @IsNumber()
  @IsPositive()
  user: number;

  @IsString()
  @Length(1, 200)
  bill: string;

  @IsDateString()
  date: Date;

  @IsNumber()
  @IsPositive()
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RegisterBoughtDetailDto)
  details: RegisterBoughtDetailDto[];
}
