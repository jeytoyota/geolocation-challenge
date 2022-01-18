import { Body, Controller, Get, Post } from '@nestjs/common';
import { Address } from 'cluster';
import { AddressService } from './address.service';


@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('create')
  getAdresses(@Body()adresses : Address[]) : any {
    return this.addressService.getAdresses(adresses);
  }

  @Get('calculation')
  calculo(coordinate : Array<any>): any {
    return this.addressService.distanceCalculation(coordinate);
  }
 
}