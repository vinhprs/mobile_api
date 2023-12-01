import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { BaseApiResponse } from '../../shared/dtos';

@Controller('')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get('/lecture/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getCommentByLecture(
    @Param('id') lectureId: number,
  ): Promise<BaseApiResponse<any>> {
    return this.commentService.getCommentByLecture(lectureId);
  }
}
