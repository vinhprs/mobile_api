import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ReqUser } from '../../common';
import { BaseApiResponse } from '../../shared/dtos';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { UpdateUserInput, UserOutputDto } from './dto';
import { UserService } from './providers';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('/info')
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateUser(
    @ReqUser() ctx: RequestContext,
    @Body() data: UpdateUserInput,
  ): Promise<BaseApiResponse<UserOutputDto>> {
    console.log(data);
    return this.userService.updateProfile(ctx.user.id, data);
  }
}
