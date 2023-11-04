import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MESSAGES } from '../../../common/constants';
import { BaseApiResponse, BasePaginationResponse } from '../../../shared/dtos';
import { CreateExamDto, FilterExamDto, FilterExamOutput, UpdateExamDto } from '../dto';
import { Exam } from '../entities';
import { QuestionService } from './question.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,
    private readonly questionService: QuestionService,
  ) {}

  async createExam(
    teacherId: string,
    data: CreateExamDto
  ): Promise<BaseApiResponse<null>> {
    const { questions } = data;
    const exam = this.examRepository.create(data);
    const includeQuestions = this.questionService.createQuestions(questions);

    await this.examRepository.save({
      ...exam,
      questions: includeQuestions,
      teacherId
    });
    return {
      error: false,
      data: null,
      message: MESSAGES.CREATED_SUCCEED,
      code: 200,
    };
  }

  async teacherGetExam(
    teacherId: string,
    filter: FilterExamDto
  ): Promise<BaseApiResponse<BasePaginationResponse<FilterExamOutput>>> {
    const { categoryId, subCategoryId, limit, page } = filter;
    const builder = this.examRepository.createQueryBuilder('exam')
    builder.andWhere('exam.teacherId = :teacherId', {teacherId});

    if (page) builder.skip((page - 1) * limit);
    if (limit) builder.take(limit);
    if(categoryId) builder.andWhere('exam.categoryId = :categoryId', {categoryId});
    if(subCategoryId) builder.andWhere('exam.subCategoryId = :subCategoryId', {subCategoryId});
    const [exams, count] = await builder.getManyAndCount();
    const result = plainToInstance(FilterExamOutput, exams, {
      excludeExtraneousValues: true
    })

    return {
      error: false,
      data: {
        listData: result,
        total: count,
        totalPage: Math.ceil(count / limit)
      },
      message: MESSAGES.GET_SUCCEED,
      code: 200
    }
  }

  async updateExam(
    _id: number,
    data: UpdateExamDto
  ): Promise<BaseApiResponse<null>> {
    const { questions } = data;
    const exam = await this.examRepository.findOne({where: {_id}});
    if(!exam)
      throw new HttpException(
        {
          error: true,
          data: null,
          message: MESSAGES.NOT_FOUND,
          code: 404,
        },
        HttpStatus.NOT_FOUND,
      );
    this.examRepository.merge(exam, data);
    if(questions) {
      const updateQuestions = await this.questionService.updateQuestions(questions);
      exam.questions = updateQuestions;
    } 
    await this.examRepository.save(exam);
    return {
      error: false,
      data: null,
      message: MESSAGES.UPDATE_SUCCEED,
      code: 200
    }
  }
  
}
