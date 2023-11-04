import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam, Question } from './entities';
import * as providers from './providers';
import * as controllers from './controllers';
@Module({
  imports: [TypeOrmModule.forFeature([Question, Exam])],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
  exports: Object.values(providers),
})
export class ExamModule {}
