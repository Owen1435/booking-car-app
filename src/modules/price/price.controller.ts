import { Body, Controller, Post } from '@nestjs/common';
import { PriceService } from './service/price.service';
import { CalculatePriceRequestDto } from './dto/request/calculate-price-request.dto';
import { CalculatePriceResponseDto } from './dto/response/calculate-price-response.dto';
import {ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('price')
@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @ApiOperation({ summary: 'Calculate price of rental' })
  @ApiResponse({ status: 201, description: 'Get calculation price of rental auto', type: CalculatePriceResponseDto })
  @ApiBadRequestResponse({description: 'Something wrong'})
  @Post()
  public async calculatePrice( @Body() priceDto: CalculatePriceRequestDto ): Promise<CalculatePriceResponseDto> {
    return await this.priceService.calculatePrice(priceDto);
  }
}
