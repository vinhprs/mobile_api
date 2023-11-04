import { Repository } from 'typeorm';
import { Question } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionDto } from '../dto';

export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  createQuestions(data: CreateQuestionDto[]): Question[] {
    const questions: Question[] = [];
    data.map((question) => {
      const createQuestion = this.questionRepository.create(question);
      questions.push(createQuestion);
    });

    return questions;
  }
}
