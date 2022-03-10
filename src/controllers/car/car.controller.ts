import {Controller, Get, Param} from '@nestjs/common';
import {GetCarResponseDto} from "../../modules/cars/dto/response/get-car-response.dto";
import {CarFacade} from "@car/application-services";
import {ApiBadRequestResponse, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {UseFilters} from "@nestjs/common/decorators";
import {DatabaseExceptionFilter, WrongDatesExceptionFilter} from "../../common/filters";

@Controller('cars-new')
export class CarController {
    constructor(private carFacade: CarFacade) {}

    @ApiOperation({ summary: 'Get car by id' })
    @ApiResponse({ status: 201, description: 'Get car by id', type: GetCarResponseDto })
    @ApiBadRequestResponse({description: 'Something wrong'})
    @UseFilters(new WrongDatesExceptionFilter(), new DatabaseExceptionFilter())
    @Get('/:carId')
    public async getCarById( @Param('carId') carId: string ): Promise<GetCarResponseDto> {
        return this.carFacade.getCar(carId)
    }

    @ApiOperation({ summary: 'Get all cars' })
    @ApiResponse({ status: 201, description: 'Get all cars', type: [GetCarResponseDto] })
    @ApiBadRequestResponse({description: 'Something wrong'})
    @UseFilters(new WrongDatesExceptionFilter(), new DatabaseExceptionFilter())
    @Get()
    public async getAllCars(): Promise<GetCarResponseDto[]> {
        return this.carFacade.getAllCars()
    }
}
