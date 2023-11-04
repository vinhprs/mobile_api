import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CategoryOutput } from '../../../modules/category/dto';
import { SectionOutput } from './section-output.dto';

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
  isPublic: boolean;

  @Expose()
  @Type(() => SectionOutput)
  sections: SectionOutput[];

  @Expose()
  @ApiProperty()
  createdAt!: Date;
}
