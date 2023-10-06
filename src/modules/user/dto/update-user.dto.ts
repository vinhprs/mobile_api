import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { AddressInput } from '../../../modules/address/dto/address-input.dto';

export class UpdateUserInput {
  @IsString()
  @IsOptional()
  @Length(5, 50)
  fullname?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsBoolean()
  @IsOptional()
  gender?: boolean;

  // @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsOptional()
  birthDate?: Date;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AddressInput)
  address: AddressInput;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  subjects: number[];

  @IsNotEmpty()
  @IsNumber()
  subjectGroup: number;
}
