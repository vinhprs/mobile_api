import { Controller, Get, Query } from '@nestjs/common';
import { AddressService } from './address.service';
import { BaseApiResponse } from '../../shared/dtos';
import { ProvinceOutput } from './dto';

@Controller('')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('province')
  async getAllProvinces(
    @Query('code') code: number,
  ): Promise<BaseApiResponse<ProvinceOutput[]>> {
    return this.addressService.getAddress(code, '/p');
  }

  @Get('district')
  async getDistrict(
    @Query('code') code: number,
  ): Promise<BaseApiResponse<ProvinceOutput[]>> {
    return this.addressService.getAddress(code, '/d');
  }
}
