import { Repository } from 'typeorm';
import { Question } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionDto } from '../dto';
import { UpdateQuestionDto } from '../dto/update-question-input.dto';

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

  async updateQuestions(data: UpdateQuestionDto[]): Promise<Question[]> {
    const bulkQuestions: Question[] = [];
    await Promise.all(
      data.map(async (question) => {
        const exist = await this.questionRepository.findOne({
          where: { _id: question.id },
        });
        if (exist) {
          this.questionRepository.merge(exist, question);
          bulkQuestions.push(exist);
        }
      }),
    );
    return bulkQuestions;
  }
}
