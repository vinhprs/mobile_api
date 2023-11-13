import { Repository } from 'typeorm';
import { Question } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerQuestionInput, CreateQuestionDto } from '../dto';
import { UpdateQuestionDto } from '../dto/update-question-input.dto';
import { QuestionCorrectionOutput } from '../dto/question-output.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';

export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async getQuestionById(_id: number): Promise<Question | null> {
    const result = await this.questionRepository.findOneBy({ _id });
    return result;
  }

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
        if (question.id) {
          const exist = await this.questionRepository.findOne({
            where: { _id: question.id },
          });
          if (exist) {
            this.questionRepository.merge(exist, question);
            bulkQuestions.push(exist);
          }
        } else {
          const newQuestion = this.questionRepository.create(question);
          console.log(newQuestion);
          bulkQuestions.push(newQuestion);
        }
      }),
    );
    return bulkQuestions;
  }

  async answerCorrection(
    data: AnswerQuestionInput[],
  ): Promise<QuestionCorrectionOutput[]> {
    const output: QuestionCorrectionOutput[] = [];
    await Promise.all(
      data.map(async (current) => {
        const { questionId, answer } = current;
        const question = await this.getQuestionById(questionId);
        if (question) {
          const isCorrect =
            JSON.stringify(question.correctAnswers) === JSON.stringify(answer);
          const instance = plainToInstance(QuestionCorrectionOutput, question, {
            excludeExtraneousValues: true,
          });
          instance.status = isCorrect;
          instance.question = question;
          instance.correctAnswers = question.correctAnswers;
          const result = plainToInstance(
            QuestionCorrectionOutput,
            instanceToPlain(instance),
          );
          output.push(result);
        }
      }),
    );
    return output;
  }
}
