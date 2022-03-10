import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { CarRepository } from '@car/providers';
import { Inject } from '@nestjs/common';
import {CalculatePriceQuery} from "@price/application-services/queries/calculate-price/calculate-price.query";
import { CalculatePriceResponseDto } from "@price/application-services/queries/calculate-price/calculate-price.response.dto";

@QueryHandler(CalculatePriceQuery)
export class CalculatePriceHandler implements ICommandHandler<CalculatePriceQuery> {
    constructor(
        @Inject('CarRepository') private repository: CarRepository
    ) {}

    async execute(command: CalculatePriceQuery): Promise<CalculatePriceResponseDto> {
        const {startDate, endDate, rateId} = command
        const start = new Date(startDate);
        const end = new Date(endDate);

        // const days = (end.getTime() - start.getTime()) / MILLISECONDS_IN_DAY;
        // const discount = await this.discountRepository.getDiscountByDays(days);
        // const discountRate = discount ? discount.rate : 0;
        // const discountCoefficient = 1 - discountRate / 100;
        //
        // const rate = await this.rateRepository.getRateById(rateId);
        // if (!rate) {
        //     throw new HttpException('Price does not exist', 400);
        // }
        //
        // const price = days * rate.price * discountCoefficient;
        //
        // return {
        //     days,
        //     price,
        //     rate: rate.price,
        //     discount: discountRate,
        // };

        return {
            days: 0,
            price: 0,
            rate: 0,
            discount: 0
        }
    }
}
