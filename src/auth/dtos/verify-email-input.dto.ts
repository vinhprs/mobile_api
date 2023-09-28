import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyEmailInput {
  @IsNotEmpty()
  @IsString()
  email!: string;

  @IsNotEmpty()
  @IsString()
  code!: string;
}
