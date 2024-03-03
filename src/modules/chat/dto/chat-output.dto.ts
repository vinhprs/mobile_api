import { Expose, Type } from 'class-transformer';
import { Course } from '../../course/entities';
import { Message } from '../entities';
import { UserOutputDto } from '../../user/dto';

export class ChatOutput {
  @Expose()
  _id!: number;

  @Expose()
  members: string[];

  @Type(() => Course)
  @Expose()
  course: Course;

  @Type(() => Message)
  @Expose()
  messages: Message[];

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;
}

export class MessageOutput {
  @Expose()
  _id!: number;

  @Expose()
  message: string;

  @Expose()
  chatId: number;

  @Type(() => UserOutputDto)
  @Expose()
  sender: UserOutputDto[];

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;
}
