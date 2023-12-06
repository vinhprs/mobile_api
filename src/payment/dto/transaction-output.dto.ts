import { Expose, Type } from "class-transformer";
import { CourseOutput } from "../../modules/course/dto";

export class TransactionOutput {
    @Expose()
    status: string;

    @Expose()
    @Type(() => CourseOutput)
    courses: CourseOutput[];
}