import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import {CalculatePriceRequestDto} from "@price/application-services/dtos/calculate-price-request.dto";
import {CalculatePriceQuery} from "@price/application-services/queries/calculate-price/calculate-price.query";

/** класс-фасад */
@Injectable()
export class PriceFacade {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus, private eventBus: EventBus) {}

    async calculatePrice(priceDto: CalculatePriceRequestDto) {
        return this.queryBus.execute(new CalculatePriceQuery(
            priceDto.startDate,
            priceDto.endDate,
            priceDto.rateId
        ));
    }
}
