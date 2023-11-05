import { Expose, Type } from 'class-transformer';
import { QuestionOuput } from './question-output.dto';

export class FilterExamOutput {
  @Expose()
  _id: number;

  @Expose()
  title: string;

  @Expose()
  categoryId: number;

  @Expose()
  subCategoryId: number;

  @Expose()
  time: number;

  @Expose()
  teacherId: string;

  @Expose()
  createdAt: Date;
}

export class ExamDetailOutput extends FilterExamOutput {
  @Expose()
  @Type(() => QuestionOuput)
  questions: QuestionOuput[];
}
