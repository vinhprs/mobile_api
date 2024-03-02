import { Controller, Get, Query } from '@nestjs/common';
import { AddressService } from './address.service';
import { BaseApiResponse } from '../../shared/dtos';
import { ProvinceOutput } from './dto';
import { Public } from 'src/common';

@Controller('')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('province')
  @Public()
  async getAllProvinces(
    @Query('code') code: number,
  ): Promise<BaseApiResponse<ProvinceOutput[]>> {
    return this.addressService.getAddress(code, '/p');
  }

  @Get('district')
  @Public()
  async getDistrict(
    @Query('code') code: number,
  ): Promise<BaseApiResponse<ProvinceOutput[]>> {
    return this.addressService.getAddress(code, '/d');
  }
}
