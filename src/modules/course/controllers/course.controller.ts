import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Public, ReqUser, Roles } from '../../../common';
import { ROLES } from '../../../shared/enums';
import { CreateCourseDto } from '../dto/create-course.dto';
import { BaseApiResponse, BasePaginationResponse } from 'src/shared/dtos';
import { CourseOutput } from '../dto';
import { CourseService } from '../providers';
import { RequestContext } from '../../../shared/request-context/request-context.dto';
import { FilterCourseDto } from '../dto/filter-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('/teacher/create')
  @Roles(ROLES.TEACHER)
  @UseInterceptors(FileInterceptor('thumbnail'))
  async createCourse(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: CreateCourseDto,
    @ReqUser() ctx: RequestContext,
  ): Promise<BaseApiResponse<CourseOutput>> {
    return this.courseService.create(ctx.user.id, data, file);
  }

  // @Get('/crawl')
  // @Public()
  // async crawl(): Promise<BaseApiResponse<CourseOutput[]>> {
  //   return this.courseService.crawlCourse();
  // }

  @Get('')
  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  async getCourses(
    @Query() filter: FilterCourseDto,
  ): Promise<BaseApiResponse<BasePaginationResponse<CourseOutput>>> {
    return this.courseService.filterCourses(filter);
  }
}
