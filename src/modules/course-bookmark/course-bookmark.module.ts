import { Module } from '@nestjs/common';
import { CourseBookmarkService } from './course-bookmark.service';
import { CourseBookmarkController } from './course-bookmark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseBookmark } from './entities/course-bookmark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseBookmark])],
  controllers: [CourseBookmarkController],
  providers: [CourseBookmarkService],
})
export class CourseBookmarkModule {}
