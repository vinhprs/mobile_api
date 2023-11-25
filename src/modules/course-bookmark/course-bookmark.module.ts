import { Module, forwardRef } from '@nestjs/common';
import { CourseBookmarkService } from './course-bookmark.service';
import { CourseBookmarkController } from './course-bookmark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseBookmark } from './entities/course-bookmark.entity';
import { UserModule } from '../user/user.module';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseBookmark]),
    UserModule,
    forwardRef(() => CourseModule),
  ],
  controllers: [CourseBookmarkController],
  providers: [CourseBookmarkService],
  exports: [CourseBookmarkService]
})
export class CourseBookmarkModule {}
