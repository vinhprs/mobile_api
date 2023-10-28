import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { BaseApiResponse } from 'src/shared/dtos';
import { UploadOutput } from './dto';
import { ReqUser } from '../../common';
import { RequestContext } from '../../shared/request-context/request-context.dto';

@Controller('')
export class FilesController {
  constructor(private readonly filesService: FileService) {}

  @Post('/upload-single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingle(
    @UploadedFile() file: Express.Multer.File,
    @ReqUser() ctx: RequestContext,
  ): Promise<BaseApiResponse<UploadOutput>> {
    return this.filesService.uploadFile(ctx.user.id, file);
  }
}
