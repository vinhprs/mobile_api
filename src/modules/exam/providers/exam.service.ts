import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from '../entities';
import { Repository } from 'typeorm';
import { CreateExamDto } from '../dto';
import { BaseApiResponse } from '../../../shared/dtos';
import { QuestionService } from './question.service';
import { MESSAGES } from '../../../common/constants';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,
    private readonly questionService: QuestionService,
  ) {}

  async createExam(data: CreateExamDto): Promise<BaseApiResponse<null>> {
    const { questions } = data;
    const exam = this.examRepository.create(data);
    const includeQuestions = this.questionService.createQuestions(questions);

    await this.examRepository.save({
      ...exam,
      questions: includeQuestions,
    });
    return {
      error: false,
      data: null,
      message: MESSAGES.CREATED_SUCCEED,
      code: 200,
    };
  }
}
