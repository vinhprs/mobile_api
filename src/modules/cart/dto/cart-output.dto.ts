import { Expose, Type } from 'class-transformer';
import { CourseOutput } from '../../../modules/course/dto';

export class CartOutput {
  @Expose()
  _id: number;

  @Expose()
  status: boolean;

  @Expose()
  discount: number;

  @Expose()
  @Type(() => CourseOutput)
  course: CourseOutput;
}

export class SummaryCartOutput {
  @Expose()
  originalPrice: number;

  @Expose()
  total: number;

  @Expose()
  @Type(() => CartOutput)
  cart: CartOutput[];
}
