import {Controller, Get, Param, ParseIntPipe} from '@nestjs/common';
import {CarFacade} from "@car/application-services";
import {ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UseFilters} from "@nestjs/common/decorators";
import { GetCarResponseDto } from './dto/get-car-response.dto';
import { DatabaseExceptionFilter, EntityNotFoundExceptionFilter, WrongDatesExceptionFilter } from '@common/filters';

@ApiTags('cars')
@UseFilters(new WrongDatesExceptionFilter(), new DatabaseExceptionFilter(), new EntityNotFoundExceptionFilter())
@Controller('cars')
export class CarController {
    constructor(private carFacade: CarFacade) {}

    @ApiOperation({ summary: 'Get car by id' })
    @ApiResponse({ status: 201, description: 'Get car by id', type: GetCarResponseDto })
    @ApiBadRequestResponse({description: 'Something wrong'})
    @Get('/:carId')
    public async getCarById( @Param('carId', ParseIntPipe) carId: number ): Promise<GetCarResponseDto> {
        return this.carFacade.getCar(carId)
    }

    @ApiOperation({ summary: 'Get all cars' })
    @ApiResponse({ status: 201, description: 'Get all cars', type: [GetCarResponseDto] })
    @ApiBadRequestResponse({description: 'Something wrong'})
    @Get()
    public async getAllCars(): Promise<GetCarResponseDto[]> {
        return this.carFacade.getAllCars()
    }
}
