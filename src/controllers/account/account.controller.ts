import { Controller, Get, Param, ParseIntPipe} from '@nestjs/common';
import {ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { UseFilters } from '@nestjs/common/decorators';
import { DatabaseExceptionFilter, WrongDatesExceptionFilter } from 'src/common/filters';
import {AccountFacade} from "@account/application-services";
import {GetAccountForAllCarsResponseDto} from "./dto/get-account-for-all-cars.response.dto";
import { GetAccountForCarResponseDto } from './dto/get-account-for-car.response.dto';

@ApiTags('account-ddd')
@Controller('account-ddd')
export class AccountController {
  constructor(private readonly accountFacade: AccountFacade) {}

  @ApiOperation({ summary: 'Get a account on the loading of the car by id on the days of the week' })
  @ApiResponse({
    status: 201,
    description: 'Get a account on the loading of the machine by id on the days of the week',
    type: GetAccountForCarResponseDto })
  @ApiBadRequestResponse({description: 'Something wrong'})
  @UseFilters(new WrongDatesExceptionFilter(), new DatabaseExceptionFilter())
  @Get('car/:carId')
  async getAccountForCar( @Param('carId', ParseIntPipe) carId: number ): Promise<GetAccountForCarResponseDto> {
    return this.accountFacade.getAccountForCar(carId.toString());
  }

  @ApiOperation({ summary: 'Get a account on the loading of the all cars on the days of the week' })
  @ApiResponse({
    status: 201,
    description: 'Get a account on the loading of the all cars on the days of the week',
    type: GetAccountForAllCarsResponseDto })
  @ApiBadRequestResponse({description: 'Something wrong'})
  @UseFilters(new WrongDatesExceptionFilter(), new DatabaseExceptionFilter())
  @Get('all-cars')
  async getAccountForAllCars(): Promise<GetAccountForAllCarsResponseDto> {
    return this.accountFacade.getAccountForAllCars();
  }
}