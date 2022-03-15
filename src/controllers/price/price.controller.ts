import {Body, Controller, Post} from '@nestjs/common';
import {ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UseFilters} from "@nestjs/common/decorators";
import {PriceFacade} from "@price/application-services";
import { CalculatePriceRequestDto } from './dto/calculate-price-request.dto';
import {CalculatePriceResponseDto} from "./dto/calculate-price-response.dto";
import { DatabaseExceptionFilter, WrongDatesExceptionFilter } from '@common/filters';

@ApiTags('price')
@Controller('price')
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
            rateId: priceDto.rateId
        });
    }
}
