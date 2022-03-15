import { Controller, Get, Param, ParseIntPipe} from '@nestjs/common';
import {ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import { UseFilters } from '@nestjs/common/decorators';
import {ReportFacade} from "@report/application-services";
import {GetReportForAllCarsResponseDto} from "./dto/get-report-for-all-cars.response.dto";
import { GetReportForCarResponseDto } from './dto/get-report-for-car.response.dto';
import {DatabaseExceptionFilter, EntityNotFoundExceptionFilter, WrongDatesExceptionFilter} from '@common/filters';

@ApiTags('report')
@UseFilters(new WrongDatesExceptionFilter(), new DatabaseExceptionFilter(), new EntityNotFoundExceptionFilter())
@Controller('report')
export class ReportController {
  constructor(private readonly reportFacade: ReportFacade) {}

  @ApiOperation({ summary: 'Get a report on the loading of the car by id on the days of the week' })
  @ApiResponse({
    status: 201,
    description: 'Get a report on the loading of the machine by id on the days of the week',
    type: GetReportForCarResponseDto })
  @ApiBadRequestResponse({description: 'Something wrong'})
  @Get('car/:carId')
  async getReportForCar( @Param('carId', ParseIntPipe) carId: number ): Promise<GetReportForCarResponseDto> {
    return this.reportFacade.getReportForCar(carId);
  }

  @ApiOperation({ summary: 'Get a report on the loading of the all cars on the days of the week' })
  @ApiResponse({
    status: 201,
    description: 'Get a report on the loading of the all cars on the days of the week',
    type: GetReportForAllCarsResponseDto })
  @ApiBadRequestResponse({description: 'Something wrong'})
  @Get('all-cars')
  async getReportForAllCars(): Promise<GetReportForAllCarsResponseDto> {
    return this.reportFacade.getReportForAllCars();
  }
}