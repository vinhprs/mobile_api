import { Expose, Type } from "class-transformer";
import { QuestionCorrectionOutput } from "./question-output.dto";

export class TakeExamOutput {
    @Expose()
    totalQuestions: number;

    @Expose()
    corrects: number;

    @Expose()
    incorrect: number;

    @Expose()
    selected: number;

    @Expose()
    unselected: number;

    @Expose()
    score: number;

    @Expose()
    time: number;

    @Expose()
    completeTime: number;

    @Expose()
    @Type(() => QuestionCorrectionOutput)
    corrections: QuestionCorrectionOutput[];

}