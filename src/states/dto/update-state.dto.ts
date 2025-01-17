import { PartialType } from '@nestjs/mapped-types';
import { CreateStateDto } from './create-state.dto';
import { IsOptional } from 'class-validator';

export class UpdateStateDto extends PartialType(CreateStateDto) {

  @IsOptional()
  name?: string;

}
