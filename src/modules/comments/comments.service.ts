import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { BaseApiResponse } from '../../shared/dtos';
import { MESSAGES } from '../../common/constants';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async getCommentByLecture(lectureId: number): Promise<BaseApiResponse<any>> {
    console.log(lectureId);
    this.commentRepository.create();
    return {
      error: false,
      data: null,
      message: MESSAGES.GET_SUCCEED,
      code: 200,
    };
  }
}
