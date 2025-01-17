import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateStateDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 30)
  name: string;
}
