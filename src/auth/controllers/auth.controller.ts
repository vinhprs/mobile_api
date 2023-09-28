import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Public } from '../../common';
import { RegisterInput } from '../dtos';
import { BaseApiResponse } from '../../shared/dtos';
import { UserOutputDto } from '../../modules/user/dto';

/**
 * route /auth/*
 */
@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  public async register(
    @Body() body: RegisterInput,
  ): Promise<BaseApiResponse<UserOutputDto>> {
    return this.authService.register(body);
  }
}
