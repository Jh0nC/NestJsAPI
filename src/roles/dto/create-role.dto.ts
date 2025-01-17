import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 30)
  name: string;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  state: number;
}
