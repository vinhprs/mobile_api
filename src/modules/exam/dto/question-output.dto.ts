import { Expose } from 'class-transformer';
import { ANSWER_TYPE, QUESTION_LEVEL } from '../../../shared/enums';

export class QuestionOuput {
  @Expose()
  _id: number;

  @Expose()
  title: string;

  @Expose()
  questionLevel: QUESTION_LEVEL;

  @Expose()
  answerType: ANSWER_TYPE;

  @Expose()
  answers: string[];

  @Expose()
  correctAnswers: number[];

  @Expose()
  explain: string;
}

export class QuestionCorrectionOutput {
  @Expose()
  questionId: number;

  @Expose()
  status: boolean;

  @Expose()
  correctAnswers: number[];

  @Expose()
  explain: string;
}
