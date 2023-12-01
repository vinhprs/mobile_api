import { Controller, Get } from '@nestjs/common';
import { Public } from '../../common';
import { CommentsService } from './comments.service';

@Controller('')
export class CommentsController {

  constructor(
    private readonly commentService: CommentsService
  ) {}

  @Get('')
  @Public()
  async getComments()
  : Promise<any> {
    return this.commentService.getComments();
  }
}
