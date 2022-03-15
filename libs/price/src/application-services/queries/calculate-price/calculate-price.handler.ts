import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CalculatePriceQuery } from "@price/application-services/queries/calculate-price/calculate-price.query";
import { CalculatePriceResponseDto } from "@price/application-services/queries/calculate-price/calculate-price.response.dto";
import { RateRepository } from "@rate/providers";
import { DiscountRepository } from '@discount/providers';
import { EntityNotFoundException } from "@common/exeptions";
import { MILLISECONDS_IN_DAY } from "@common/constants";

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
            throw new EntityNotFoundException('Rate')
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
