import { IsOptional } from 'class-validator';

export class UpdateDto {
  @IsOptional()
  username: string;
  @IsOptional()
  password: string;
}
