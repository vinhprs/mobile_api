import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { BaseApiResponse, BasePaginationResponse } from '../../shared/dtos';
import { MESSAGES } from '../../common/constants';
import { plainToInstance } from 'class-transformer';
import { CommentOutput } from './dto/comment-output.dto';
import { CommentInput, FilterCommentInput } from './dto';
import { UserService } from '../user/providers';
import { LectureService } from '../course/providers';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly userService: UserService,
    private readonly lectureService: LectureService,
  ) {}

  async createComment(
    userId: string,
    data: CommentInput,
  ): Promise<BaseApiResponse<CommentOutput>> {
    const [user, lecture] = await Promise.all([
      this.userService.getUserByUserId(userId),
      this.lectureService.getLectureById(data.lectureId),
    ]);
    if (!user || !lecture)
      throw new HttpException(
        {
          error: true,
          data: null,
          message: MESSAGES.NOT_FOUND,
          code: 404,
        },
        HttpStatus.NOT_FOUND,
      );
    const comment = this.commentRepository.create(data);
    const created = await this.commentRepository.save({
      ...comment,
      user,
      author: user.fullname,
      authorThumbnail: user.avatar,
      lecture,
    });
    const result = plainToInstance(CommentOutput, created, {
      excludeExtraneousValues: true,
    });

    return {
      error: false,
      data: result,
      message: MESSAGES.CREATED_SUCCEED,
      code: 200,
    };
  }

  async getCommentByLecture(
    lectureId: number,
    query: FilterCommentInput,
  ): Promise<BaseApiResponse<BasePaginationResponse<CommentOutput>>> {
    const { limit, page } = query;
    const builder = this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .andWhere('comment.lecture_id = :lecture_id', { lecture_id: lectureId });

    if (limit) builder.take(limit);
    if (page) builder.skip((page - 1) * limit);

    const [comments, total] = await builder.getManyAndCount();
    const result = plainToInstance(CommentOutput, comments, {
      excludeExtraneousValues: true,
    });
    return {
      error: false,
      data: {
        listData: result,
        total,
        totalPage: Math.ceil(total / limit),
      },
      message: MESSAGES.GET_SUCCEED,
      code: 200,
    };
  }
}
