import { Transform, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationParamsDto } from '../../../shared/dtos';

export class FilterCourseDto extends PaginationParamsDto {
  @IsString()
  @IsOptional()
  userId?: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @Transform(({ value }) => value.toString().split(',').map(Number))
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  subCategoryId?: number[];

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  startPrice?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  endPrice?: number;

  @IsString()
  @IsOptional()
  search?: string;
}

export class TeacherFilterCourses extends PaginationParamsDto {
  @IsString()
  @IsOptional()
  search?: string;
}
