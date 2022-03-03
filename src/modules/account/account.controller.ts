import {Controller, Get, Param} from '@nestjs/common';
import { AccountService } from './service/account.service';
import { AccountForEachCarResponseDto } from './dto/response/account-for-each-car-response.dto';
import {AccountForAllCarsResponseDto} from "./dto/response/account-for-all-cars-response.dto";
import {ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: 'Get a account on the loading of the car by id on the days of the week' })
  @ApiResponse({
    status: 201,
    description: 'Get a account on the loading of the machine by id on the days of the week',
    type: [AccountForEachCarResponseDto] })
  @ApiBadRequestResponse({description: 'Something wrong'})
  @Get('car/:autoId')
  async getAccountForCar( @Param('autoId') autoId: number ): Promise<AccountForEachCarResponseDto[]> {
    return this.accountService.getAccountForCar(autoId);
  }

  @ApiOperation({ summary: 'Get a account on the loading of the all cars on the days of the week' })
  @ApiResponse({
    status: 201,
    description: 'Get a account on the loading of the all cars on the days of the week',
    type: [AccountForAllCarsResponseDto] })
  @ApiBadRequestResponse({description: 'Something wrong'})
  @Get('all-cars')
  async getAccountForAllCars(): Promise<AccountForAllCarsResponseDto[]> {
    return this.accountService.getAccountForAllCars();
  }
}
