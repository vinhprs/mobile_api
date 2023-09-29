import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordInput {
  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsString()
  code!: string;
}
