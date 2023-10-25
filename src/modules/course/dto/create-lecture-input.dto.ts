import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { LECTURE_TYPE } from '../../../shared/enums';

export class CreateLecture {
  @IsNotEmpty()
  @IsString()
  lectureName: string;

  @IsNotEmpty()
  @IsEnum(LECTURE_TYPE)
  lectureType: LECTURE_TYPE;

  @IsNumber()
  @IsOptional()
  duration: number;

  @IsNotEmpty()
  @IsString()
  url: string;
}
