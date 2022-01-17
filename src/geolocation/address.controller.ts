import { Body, Controller, Get, Post } from '@nestjs/common';
import { Address } from 'cluster';
import { AddressService } from './address.service';


@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  getHello(): string {
    return this.addressService.getHello();
  }

  @Post('add')
  getAdresses(@Body()adresses : Address[]) : any {
    return this.addressService.getAdresses(adresses);
  }
  @Get('conta')
  calculo(): any {
    return this.addressService.testeConta();
  }
 
}