import { Expose, Type } from 'class-transformer';
import { CourseOutput } from '../../../modules/course/dto';

export class BookmarkOuput {
  @Expose()
  @Type(() => CourseOutput)
  course: CourseOutput;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
