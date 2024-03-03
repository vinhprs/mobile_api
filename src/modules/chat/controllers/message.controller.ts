import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { MessageService } from '../providers';
import { ReqUser } from '@/src/common';
import { RequestContext } from '@/src/shared/request-context/request-context.dto';
import { MessageOutput, SendMessageInput } from '../dto';
import { BaseApiResponse } from '@/src/shared/dtos';

@Controller('')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/send-message')
  @UseInterceptors(ClassSerializerInterceptor)
  async sendMessage(
    @ReqUser() ctx: RequestContext,
    @Body() data: SendMessageInput,
  ): Promise<BaseApiResponse<null>> {
    return this.messageService.sendMessage(ctx.user.id, data);
  }

  @Get('/chat/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getMessages(
    @Param('id') chatId: number,
  ): Promise<BaseApiResponse<MessageOutput[]>> {
    return this.messageService.getMessages(chatId);
  }
}
