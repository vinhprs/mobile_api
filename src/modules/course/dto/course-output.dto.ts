import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Section } from '../entities';
import { CategoryOutput } from '../../../modules/category/dto';

export class CourseOutput {
  @Expose()
  @ApiProperty()
  _id: number;

  @Expose()
  @ApiProperty()
  courseName: string;

  @Expose()
  @ApiProperty()
  thumbnail_url: string;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  price!: number;

  @Expose()
  @ApiProperty()
  expiredDate: Date;

  @Expose()
  @ApiProperty()
  category: CategoryOutput;

  @Expose()
  @ApiProperty()
  subCategory: CategoryOutput;

  @Expose()
  subCategoryId: number;

  @Expose()
  categoryId: number;

  @Expose()
  @ApiProperty()
  sections: Section[];

  @Expose()
  @ApiProperty()
  createdAt!: Date;
}
