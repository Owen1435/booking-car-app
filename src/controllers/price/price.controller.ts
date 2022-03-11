import {Body, Controller, Post} from '@nestjs/common';
import {ApiBadRequestResponse, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {UseFilters} from "@nestjs/common/decorators";
import {DatabaseExceptionFilter, WrongDatesExceptionFilter} from "../../common/filters";
import {PriceFacade} from "@price/application-services";
import {CalculatePriceResponseDto} from "../../modules/price/dto/response/calculate-price-response.dto";
import { CalculatePriceRequestDto } from './dto/calculate-price-request.dto';

@Controller('price-new')
export class PriceController {
    constructor(private priceFacade: PriceFacade) {}

    @ApiOperation({ summary: 'Calculate price of rental' })
    @ApiResponse({ status: 201, description: 'Get calculation price of rental auto', type: CalculatePriceResponseDto })
    @ApiBadRequestResponse({description: 'Something wrong'})
    @UseFilters(new WrongDatesExceptionFilter(), new DatabaseExceptionFilter())
    @Post()
    public async calculatePrice( @Body() priceDto: CalculatePriceRequestDto ): Promise<CalculatePriceResponseDto> {
        return await this.priceFacade.calculatePrice({
            startDate: priceDto.startDate,
            endDate: priceDto.endDate,
            rateId: priceDto.rateId.toString()
        });
    }
}
