import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SharedModule } from '../../shared/share.module';
import { CourseModule } from '../course/course.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), SharedModule, CourseModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
