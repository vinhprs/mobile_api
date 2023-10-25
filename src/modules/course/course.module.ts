import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course, Lecture, Section } from './entities';
import * as providers from './providers';
import * as controllers from './controllers';
import { UserModule } from '../user/user.module';
import { SharedModule } from '../../shared/share.module';
import { SubjectsModule } from '../subjects/subjects.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Section, Lecture]),
    UserModule,
    SharedModule,
    SubjectsModule,
  ],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
})
export class CourseModule {}
