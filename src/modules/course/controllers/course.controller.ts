import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Public, ReqUser, Roles } from '../../../common';
import { ROLES } from '../../../shared/enums';
import { CreateCourseDto } from '../dto/create-course.dto';
import { BaseApiResponse, BasePaginationResponse } from 'src/shared/dtos';
import { CourseOutput } from '../dto';
import { CourseService } from '../providers';
import { RequestContext } from '../../../shared/request-context/request-context.dto';
import {
  FilterCourseDto,
  TeacherFilterCourses,
} from '../dto/filter-course.dto';

@Controller('')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('/teacher/create')
  @Roles(ROLES.TEACHER)
  @UseInterceptors(ClassSerializerInterceptor)
  async createCourse(
    @Body() data: CreateCourseDto,
    @ReqUser() ctx: RequestContext,
  ): Promise<BaseApiResponse<CourseOutput>> {
    return this.courseService.create(ctx.user.id, data);
  }

  @Get('/teacher/my-course')
  @Roles(ROLES.TEACHER)
  @UseInterceptors(ClassSerializerInterceptor)
  async teacherGetCourses(
    @ReqUser() ctx: RequestContext,
    @Query() filter: TeacherFilterCourses,
  ): Promise<BaseApiResponse<BasePaginationResponse<CourseOutput>>> {
    return this.courseService.teacherGetCourse(ctx.user.id, filter);
  }

  @Get('')
  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  async getCourses(
    @Query() filter: FilterCourseDto,
  ): Promise<BaseApiResponse<BasePaginationResponse<CourseOutput>>> {
    return this.courseService.filterCourses(filter);
  }
}
