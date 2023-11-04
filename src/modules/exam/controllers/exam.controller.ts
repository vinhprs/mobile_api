import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ExamService } from '../providers';
import { ROLES } from '../../../shared/enums';
import { CreateExamDto } from '../dto';
import { BaseApiResponse } from 'src/shared/dtos';
import { Roles } from '../../../common/decorators';

@Controller('')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post('/teacher/create')
  @Roles(ROLES.TEACHER)
  @UseInterceptors(ClassSerializerInterceptor)
  async createExam(
    @Body() data: CreateExamDto,
  ): Promise<BaseApiResponse<null>> {
    return this.examService.createExam(data);
  }
}
