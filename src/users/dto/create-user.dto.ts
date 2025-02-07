import { Transform } from 'class-transformer';
import { IsEmail, IsInt, IsPositive, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  @IsPositive()
  docType: number;

  @IsString()
  @Length(6, 11)
  @Transform(({ value }) => value.trim())
  document: string;

  @IsString()
  @Length(1, 60)
  @Transform(({ value }) => value.toLowerCase())
  firstName: string;

  @IsString()
  @Length(1, 60)
  @Transform(({ value }) => value.toLowerCase())
  lastName: string;

  @IsString()
  @Length(7, 12)
  @Transform(({ value }) => value.trim())
  phoneNumber: string;

  @IsString()
  @Length(5, 100)
  address: string;

  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @IsString()
  @Length(10, 100)
  password: string;
}
