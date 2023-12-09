import { Expose } from 'class-transformer';

export class BaseApiResponse<T> {
  @Expose()
  error: boolean;

  @Expose()
  data: T;

  @Expose()
  message: string;

  @Expose()
  code: number;
}

export class BasePaginationResponse<T> {
  @Expose()
  listData: T[];

  @Expose()
  total: number;

  @Expose()
  totalPage: number;
}

export class DictionaryPaginationResponse<T> {
  @Expose()
  data: T;

  @Expose()
  total: number;

  @Expose()
  totalPage: number;
}
