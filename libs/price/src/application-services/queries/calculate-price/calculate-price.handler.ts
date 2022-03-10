import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import {HttpException, Inject } from '@nestjs/common';
import { CalculatePriceQuery } from "@price/application-services/queries/calculate-price/calculate-price.query";
import { CalculatePriceResponseDto } from "@price/application-services/queries/calculate-price/calculate-price.response.dto";
import { RateRepository } from "@rate/providers";
import { DiscountRepository } from '@discount/providers';
import { MILLISECONDS_IN_DAY } from 'src/common/constants';
import {CarDomainService} from "@car/domain-services/car-domain.service";
import {PriceDomainService} from "@price/domain-services/price-domain.service";

@QueryHandler(CalculatePriceQuery)
export class CalculatePriceHandler implements ICommandHandler<CalculatePriceQuery> {
    constructor(
        @Inject('RateRepository') private rateRepository: RateRepository,
        @Inject('DiscountRepository') private discountRepository: DiscountRepository
    ) {}

    async execute(command: CalculatePriceQuery): Promise<CalculatePriceResponseDto> {
        const {startDate, endDate, rateId} = command
        const start = new Date(startDate);
        const end = new Date(endDate);

        const days = (end.getTime() - start.getTime()) / MILLISECONDS_IN_DAY;
        const discount = await this.discountRepository.findDiscountByDays(days);
        const discountRate = discount ? discount.rate : 0;
        const discountCoefficient = 1 - discountRate / 100;

        const rate = await this.rateRepository.findRateById(rateId);
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
