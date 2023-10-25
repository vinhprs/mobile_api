import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateSection } from '.';
export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  courseName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  expiredDate: Date;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  subCategoryId: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateSection)
  sections: CreateSection[];
}
