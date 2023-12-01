import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { BaseApiResponse, BasePaginationResponse } from '../../shared/dtos';
import { CommentInput, CommentOutput, FilterCommentInput } from './dto';
import { ReqUser } from '../../common';
import { RequestContext } from '../../shared/request-context/request-context.dto';

@Controller('')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get('/lecture/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getCommentByLecture(
    @Param('id') lectureId: number,
    @Query() query: FilterCommentInput,
  ): Promise<BaseApiResponse<BasePaginationResponse<CommentOutput>>> {
    return this.commentService.getCommentByLecture(lectureId, query);
  }

  @Post('')
  @UseInterceptors(ClassSerializerInterceptor)
  async comment(
    @ReqUser() ctx: RequestContext,
    @Body() data: CommentInput,
  ): Promise<BaseApiResponse<CommentOutput>> {
    return this.commentService.createComment(ctx.user.id, data);
  }
}
