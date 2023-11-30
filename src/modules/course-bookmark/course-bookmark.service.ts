import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseApiResponse } from '../../shared/dtos';
import { CourseBookmark } from './entities';
import { BookmarkCourseDto } from './dto/create-course-bookmark.dto';
import { UserService } from '../user/providers';
import { CourseService } from '../course/providers';
import { MESSAGES } from '../../common/constants';
import { BookmarkOuput } from './dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CourseBookmarkService {
  constructor(
    @InjectRepository(CourseBookmark)
    private readonly bookmarkRepository: Repository<CourseBookmark>,
    private readonly userService: UserService,
    @Inject(forwardRef(() => CourseService))
    private readonly courseService: CourseService,
  ) {}

  async getUserBookmarks(
    userId: string,
  ): Promise<BaseApiResponse<BookmarkOuput[]>> {
    const bookmarks = await this.bookmarkRepository
      .createQueryBuilder('bookmark')
      .leftJoinAndSelect('bookmark.course', 'course')
      .andWhere('bookmark.user_id = :user_id', { user_id: userId })
      .orderBy('bookmark.createdAt', 'DESC')
      .getMany();

    const result = plainToInstance(BookmarkOuput, bookmarks, {
      excludeExtraneousValues: true,
    });
    return {
      error: false,
      data: result,
      message: MESSAGES.GET_SUCCEED,
      code: 200,
    };
  }

  async bookmarkCourse(
    data: BookmarkCourseDto,
    userId: string,
  ): Promise<BaseApiResponse<null>> {
    const { courseId } = data;
    const [course, user, bookmark] = await Promise.all([
      this.courseService.getCourseById(courseId),
      this.userService.getUserByUserId(userId),
      this.getBookmarkById(courseId, userId),
    ]);
    if (!course.data || !user)
      throw new HttpException(
        {
          error: true,
          data: null,
          message: MESSAGES.NOT_FOUND,
          code: 404,
        },
        HttpStatus.NOT_FOUND,
      );
    if (bookmark) await this.bookmarkRepository.remove(bookmark);
    else {
      const createBookmark = this.bookmarkRepository.create();
      await this.bookmarkRepository.save({
        ...createBookmark,
        user,
        course: course.data,
      });
    }
    return {
      error: false,
      data: null,
      message: MESSAGES.CREATED_SUCCEED,
      code: 200,
    };
  }

  async getBookmarkById(
    courseId: number,
    userId: string,
  ): Promise<CourseBookmark | null> {
    const exist = await this.bookmarkRepository
      .createQueryBuilder('bookmark')
      .andWhere('bookmark.user_id = :user_id', { user_id: userId })
      .andWhere('bookmark.course_id = :course_id', { course_id: courseId })
      .getOne();

    return exist;
  }
}
