import { Injectable } from '@nestjs/common';
import { CalculatePriceRequestDto } from '../dto/request/calculate-price-request.dto';
import { CalculatePriceResponseDto } from '../dto/response/calculate-price-response.dto';
import { MILLISECONDS_IN_DAY } from 'src/common/constants';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { DiscountRepository } from 'src/modules/discount/repository/discount.repository';
import { RateRepository } from 'src/modules/rate/repository/rate.repository';

@Injectable()
export class PriceService {
  constructor(
    private readonly rateRepository: RateRepository,
    private readonly discountRepository: DiscountRepository,
  ) {}

  public async calculatePrice( priceDto: CalculatePriceRequestDto ): Promise<CalculatePriceResponseDto> {
    const start = new Date(priceDto.startDate);
    const end = new Date(priceDto.endDate);

    const days = (end.getTime() - start.getTime()) / MILLISECONDS_IN_DAY;
    const discount = await this.discountRepository.getDiscountByDays(days);
    const discountRate = discount ? discount.rate : 0;
    const discountCoefficient = 1 - discountRate / 100;

    const rate = await this.rateRepository.getRateById(priceDto.rateId);
    if (!rate) {
      throw new HttpException('Rate does not exist', 400);
    }

    const price = days * rate.price * discountCoefficient;

    return {
      days,
      price,
      rate: rate.price,
      discount: discountRate,
    };
  }
}
