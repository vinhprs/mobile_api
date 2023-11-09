import { PartialType } from '@nestjs/swagger';
import { CreateCourseBookmarkDto } from './create-course-bookmark.dto';

export class UpdateCourseBookmarkDto extends PartialType(
  CreateCourseBookmarkDto,
) {}
