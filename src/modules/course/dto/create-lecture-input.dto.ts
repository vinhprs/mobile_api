import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { LECTURE_TYPE } from '../../../shared/enums';
import { Type } from 'class-transformer';

export class CreateLecture {
  @IsNotEmpty()
  @IsString()
  lectureName: string;

  @IsNotEmpty()
  @IsEnum(LECTURE_TYPE)
  lectureType: LECTURE_TYPE;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  duration: number;

  @IsNotEmpty()
  @IsString()
  url: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  examId: number;
}
