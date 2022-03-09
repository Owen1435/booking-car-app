import {Controller, Get, Param} from '@nestjs/common';
import { AccountService } from './service/account.service';
import {CarAccountResponseDto} from "./dto/response/car-account-response.dto";
import {ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { ParseIntPipe } from '@nestjs/common';
import {UseFilters} from "@nestjs/common/decorators";
import {DatabaseExceptionFilter, WrongDatesExceptionFilter} from "../../common/filters";

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: 'Get a account on the loading of the car by id on the days of the week' })
  @ApiResponse({
    status: 201,
    description: 'Get a account on the loading of the machine by id on the days of the week',
    type: [CarAccountResponseDto] })
  @ApiBadRequestResponse({description: 'Something wrong'})
  @UseFilters(new WrongDatesExceptionFilter(), new DatabaseExceptionFilter())
  @Get('car/:autoId')
  async getAccountForCar( @Param('autoId', ParseIntPipe) autoId: number ): Promise<CarAccountResponseDto[]> {
    return this.accountService.getAccountForCar(autoId);
  }

  @ApiOperation({ summary: 'Get a account on the loading of the all cars on the days of the week' })
  @ApiResponse({
    status: 201,
    description: 'Get a account on the loading of the all cars on the days of the week',
    type: [CarAccountResponseDto] })
  @ApiBadRequestResponse({description: 'Something wrong'})
  @UseFilters(new WrongDatesExceptionFilter(), new DatabaseExceptionFilter())
  @Get('all-cars')
  async getAccountForAllCars(): Promise<CarAccountResponseDto[]> {
    return this.accountService.getAccountForAllCars();
  }
}
