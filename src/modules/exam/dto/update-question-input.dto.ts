import { ArrayMinSize, IsArray, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { QUESTION_LEVEL } from "../../../shared/enums/question-level.enum";

export class UpdateQuestionDto {
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsString()
    @IsOptional()
    title?: string;

    @IsEnum(QUESTION_LEVEL)
    @IsOptional()
    questionLevel?: QUESTION_LEVEL;

    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(2)
    @IsOptional()
    answers?: string[];

    @IsArray()
    @IsNumber({}, { each: true })
    @ArrayMinSize(1)
    @IsOptional()
    correctAnswers?: number[];

    @IsString()
    @IsOptional()
    explain?: string;
}