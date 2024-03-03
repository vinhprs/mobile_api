import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SendMessageInput {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNumber()
  @IsNotEmpty()
  chatId: number;
}
