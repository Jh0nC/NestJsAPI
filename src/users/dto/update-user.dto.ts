import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsInt()
  @IsPositive()
  state?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  docType?: number;

  @IsOptional()
  @IsString()
  @Length(6, 11)
  document?: string;

  @IsOptional()
  @IsString()
  @Length(1, 60)
  @Transform(({ value }) => value.toLowerCase())
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(1, 60)
  @Transform(({ value }) => value.toLowerCase())
  lastName?: string;

  @IsOptional()
  @IsString()
  @Length(7, 12)
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @Length(5, 100)
  address?: string;

  @IsOptional()
  @IsString()
  @Length(8, 100)
  email?: string;
}
