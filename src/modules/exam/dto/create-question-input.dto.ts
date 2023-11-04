import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { QUESTION_LEVEL } from '../../../shared/enums/question-level.enum';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsEnum(QUESTION_LEVEL)
  questionLevel: QUESTION_LEVEL;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(2)
  answers: string[];

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  correctAnswers: number[];

  @IsNotEmpty()
  @IsString()
  explain: string;
}
