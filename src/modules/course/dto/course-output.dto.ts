import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Section } from '../entities';

export class CourseOutput {
  @Expose()
  @ApiProperty()
  _id: number;

  @Expose()
  @ApiProperty()
  courseName: string;

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
  categoryId: number;

  @Expose()
  @ApiProperty()
  subCategoryId: number;

  @Expose()
  @ApiProperty()
  sections: Section[];

  @Expose()
  @ApiProperty()
  createdAt!: Date;
}
