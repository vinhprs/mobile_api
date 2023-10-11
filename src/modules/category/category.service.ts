import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities';
import { Repository } from 'typeorm';
import { CategoryOutput, CreateCategory } from './dto';
import { plainToInstance } from 'class-transformer';
import { BaseApiResponse } from '../../shared/dtos';
import { MESSAGES } from '../../common/constants';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async getCategory()
  : Promise<BaseApiResponse<CategoryOutput[]>> {
    const category = await this.categoryRepository.createQueryBuilder('category')
      .andWhere('category.category_id IS NULL')
      .leftJoinAndSelect('category.childs', 'childs')
      .getMany();
    
    const result = plainToInstance(CategoryOutput, category, {
      excludeExtraneousValues: true
    });
    return {
      error: false,
      data: result,
      message: MESSAGES.GET_SUCCEED,
      code: 200
    };
  }

  async create(
    data: CreateCategory
  ): Promise<BaseApiResponse<CategoryOutput>>{
    const createCategory = this.categoryRepository.create(data);

    if (data.categoryId) {
      const parent = await this.categoryRepository.findOne({
        where: { _id: data.categoryId },
      });
      if (parent) {
        createCategory.category = parent;
      }
    }
    await this.categoryRepository.save(createCategory);
    const result = plainToInstance(CategoryOutput, createCategory, {
      excludeExtraneousValues: true
    });

    return {
      error: false,
      data: result,
      message: MESSAGES.CREATED_SUCCEED,
      code: 200
    };
  }
}
