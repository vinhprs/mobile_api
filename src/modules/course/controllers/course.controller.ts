import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { BaseApiResponse, BasePaginationResponse } from 'src/shared/dtos';
import { Public, ReqUser, Roles } from '../../../common';
import { ROLES } from '../../../shared/enums';
import { RequestContext } from '../../../shared/request-context/request-context.dto';
import { CourseOutput } from '../dto';
import { CreateCourseDto } from '../dto/create-course.dto';
import {
  FilterCourseDto,
  FilterCourseParticipants,
  TeacherFilterCourses,
} from '../dto/filter-course.dto';
import { PublicCourseInput } from '../dto/public-course-input.dto';
import { CourseService } from '../providers';
import { UserOutputDto } from 'src/modules/user/dto';

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

  @Put('/teacher/public-course')
  @Roles(ROLES.TEACHER)
  @UseInterceptors(ClassSerializerInterceptor)
  async publicCourse(
    @Body() data: PublicCourseInput,
  ): Promise<BaseApiResponse<null>> {
    return this.courseService.publicCourse(data);
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

  @Get('student/my-course')
  @Roles(ROLES.STUDENT)
  @UseInterceptors(ClassSerializerInterceptor)
  async getPaidCourse(
    @ReqUser() ctx: RequestContext,
  ): Promise<BaseApiResponse<CourseOutput[]>> {
    return this.courseService.getPaidCourse(ctx.user.id);
  }

  @Get('')
  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  async getCourses(
    @ReqUser() ctx: RequestContext,
    @Query() filter: FilterCourseDto,
  ): Promise<BaseApiResponse<BasePaginationResponse<CourseOutput>>> {
    return this.courseService.filterCourses(ctx?.user?.id, filter);
  }

  @Get('/detail/:id')
  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  async getCourseById(
    @ReqUser() req: RequestContext,
    @Param('id') id: number,
  ): Promise<BaseApiResponse<CourseOutput>> {
    const userId = req?.user?.id;
    return this.courseService.getCourseById(id, userId);
  }

  @Get('/participants')
  @UseInterceptors(ClassSerializerInterceptor)
  async getParticipants(
    @Query() filter: FilterCourseParticipants,
  ): Promise<BaseApiResponse<BasePaginationResponse<UserOutputDto>>> {
    return this.courseService.getCourseParticipants(filter);
  }
}
