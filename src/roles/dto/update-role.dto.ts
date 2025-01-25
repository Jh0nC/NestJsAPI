import { IsInt, IsOptional } from "class-validator";

export class UpdateRoleDto {
  @IsInt()
  @IsOptional()
  state?: number;
}
