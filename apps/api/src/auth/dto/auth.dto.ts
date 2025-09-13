import { IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  phone: string;

  @IsString()
  password: string;
}
