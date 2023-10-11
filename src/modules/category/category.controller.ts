import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ROLES } from '../../shared/enums';
import { CategoryOutput, CreateCategory } from './dto';
import { BaseApiResponse } from '../../shared/dtos';
import { Public, Roles } from '../../common';

@Controller('')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ) {}

  @Post('/admin')
  @Roles(ROLES.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  async createCategory(
    @Body() data: CreateCategory
  ): Promise<BaseApiResponse<CategoryOutput>> {
    return this.categoryService.create(data);
  }

  @Get('')
  @Public()
  async getCategory()
  : Promise<BaseApiResponse<CategoryOutput[]>> {
    return this.categoryService.getCategory();
  }
}
