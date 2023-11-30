import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course, Lecture, Section } from './entities';
import * as providers from './providers';
import * as controllers from './controllers';
import { UserModule } from '../user/user.module';
import { SubjectsModule } from '../subjects/subjects.module';
import { CategoryModule } from '../category/category.module';
import { CartModule } from '../cart/cart.module';
import { CourseBookmarkModule } from '../course-bookmark/course-bookmark.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Section, Lecture]),
    UserModule,
    SubjectsModule,
    CategoryModule,
    forwardRef(() => CartModule),
    forwardRef(() => CourseBookmarkModule),
  ],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
  exports: Object.values(providers),
})
export class CourseModule {}
