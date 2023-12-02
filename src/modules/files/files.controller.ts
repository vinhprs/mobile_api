import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReqUser } from '../../common';
import { BaseApiResponse } from '../../shared/dtos';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { UploadOutput } from './dto';
import { FileService } from './files.service';

@Controller('')
export class FilesController {
  constructor(private readonly filesService: FileService) {}

  @Post('/upload-single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingle(
    @UploadedFile() file: Express.Multer.File,
    @ReqUser() ctx: RequestContext,
  ): Promise<BaseApiResponse<UploadOutput>> {
    return this.filesService.uploadFile('images', ctx.user.id, file);
  }
}
