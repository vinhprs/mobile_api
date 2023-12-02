import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { LectureService } from '../providers';
import { Public, ReqUser } from '../../../common';
import { RequestContext } from '../../../shared/request-context/request-context.dto';
import { Response } from 'express';

@Controller('')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Get('/lecture/:id')
  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  async getLectureVideo(
    @ReqUser() ctx: RequestContext,
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<void> {
    return this.lectureService.getLectureVideo(ctx, id, res);
  }
}
