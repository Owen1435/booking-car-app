import { Controller, Get, Param } from '@nestjs/common';
import { CarService } from './service/car.service';
import { GetCarResponseDto } from './dto/response/get-car-response.dto';
import {ApiOperation, ApiResponse, ApiBadRequestResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('cars')
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiOperation({ summary: 'Get car by id' })
  @ApiResponse({ status: 201, description: 'Get car by id', type: GetCarResponseDto })
  @ApiBadRequestResponse({description: 'Something wrong'})
  @Get('/:carId')
  public async getCarById( @Param('carId') carId: number ): Promise<GetCarResponseDto> {
    return this.carService.getCarById(carId);
  }

  @ApiOperation({ summary: 'Get all cars' })
  @ApiResponse({ status: 201, description: 'Get all cars', type: [GetCarResponseDto] })
  @ApiBadRequestResponse({description: 'Something wrong'})
  @Get()
  public async getAllCars(): Promise<GetCarResponseDto[]> {
    return this.carService.getAllCars();
  }
}
