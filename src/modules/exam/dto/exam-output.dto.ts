import { Expose } from "class-transformer";

export class FilterExamOutput {
    @Expose()
    _id: number;

    @Expose()
    title: string;
  
    @Expose()
    categoryId: number;
  
    @Expose()
    subCategoryId: number;
  
    @Expose()
    time: number;
  
    @Expose()
    teacherId: string;
}