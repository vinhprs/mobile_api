import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProvinceOutput {
  @Expose()
  @ApiProperty()
  public name: string;

  @Expose()
  @ApiProperty()
  public code: number;

  @Expose()
  @ApiProperty()
  public division_type: string;

  @Expose()
  @ApiProperty()
  public districts: ProvinceOutput[];
}
