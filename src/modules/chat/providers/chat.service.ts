import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from '../entities';
import { Repository } from 'typeorm';
import { ChatOutput } from '../dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  async getChatById(_id: number): Promise<ChatOutput> {
    const chat = await this.chatRepository.findOne({ where: { _id } });
    const result = plainToInstance(ChatOutput, chat, {
      excludeExtraneousValues: true,
    });

    return result;
  }
}
