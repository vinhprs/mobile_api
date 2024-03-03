import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../entities';
import { Repository } from 'typeorm';
import { MessageOutput, SendMessageInput } from '../dto';
import { BaseApiResponse } from '@/src/shared/dtos';
import { UserService } from '../../user/providers';
import { MESSAGES } from '@/src/common/constants/common';
import { ChatService } from './chat.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly userService: UserService,
    private readonly chatService: ChatService,
  ) {}

  async sendMessage(
    userId: string,
    data: SendMessageInput,
  ): Promise<BaseApiResponse<null>> {
    const [sender, chat] = await Promise.all([
      this.userService.getUserByUserId(userId),
      this.chatService.getChatById(data.chatId),
    ]);
    if (!sender)
      throw new HttpException(
        {
          error: true,
          data: null,
          message: MESSAGES.NOT_FOUND,
          code: 404,
        },
        HttpStatus.NOT_FOUND,
      );
    const newMsg = this.messageRepository.create({ ...data, chat, sender });
    await this.messageRepository.save(newMsg);

    return {
      error: false,
      data: null,
      message: MESSAGES.CREATED_SUCCEED,
      code: 201,
    };
  }

  async getMessages(chatId: number): Promise<BaseApiResponse<MessageOutput[]>> {
    const builder = this.messageRepository
      .createQueryBuilder('message')
      .andWhere('message.chat_id =: chatId', { chatId });
    const msg = await builder.getMany();

    const result = plainToInstance(MessageOutput, msg, {
      excludeExtraneousValues: true,
    });

    return {
      error: false,
      data: result,
      code: 200,
      message: MESSAGES.GET_SUCCEED,
    };
  }
}
