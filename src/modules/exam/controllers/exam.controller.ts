import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors
} from '@nestjs/common';
import { BaseApiResponse, BasePaginationResponse } from 'src/shared/dtos';
import { ReqUser, Roles } from '../../../common/decorators';
import { ROLES } from '../../../shared/enums';
import { RequestContext } from '../../../shared/request-context/request-context.dto';
import { CreateExamDto, FilterExamDto, FilterExamOutput, UpdateExamDto } from '../dto';
import { ExamService } from '../providers';

@Controller('')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post('/teacher/create')
  @Roles(ROLES.TEACHER)
  @UseInterceptors(ClassSerializerInterceptor)
  async createExam(
    @ReqUser() ctx: RequestContext,
    @Body() data: CreateExamDto,
  ): Promise<BaseApiResponse<null>> {
    return this.examService.createExam(ctx.user.id, data);
  }

  @Get('/teacher/my-exam')
  @Roles(ROLES.TEACHER)
  @UseInterceptors(ClassSerializerInterceptor)
  async teacherGetExam(
    @ReqUser() ctx: RequestContext,
    @Query() filter: FilterExamDto
  ): Promise<BaseApiResponse<BasePaginationResponse<FilterExamOutput>>> {
    return this.examService.teacherGetExam(ctx.user.id, filter);
  }

  @Put('/teacher/update/:id')
  @Roles(ROLES.TEACHER)
  @UseInterceptors(ClassSerializerInterceptor)
  async updateExam(
    @Param('id') id: number,
    @Body() data: UpdateExamDto
  ): Promise<BaseApiResponse<null>> {
    return this.examService.updateExam(id, data);
  }

}
