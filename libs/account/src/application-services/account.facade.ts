import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import {
    GetAccountForCarQuery
} from "@account/application-services/queries/get-account-for-car/get-account-for-car.query";
import {
    GetAccountForAllCarsQuery
} from "@account/application-services/queries/get-account-for-all-cars/get-account-for-all-cars.query";

/** класс-фасад */
@Injectable()
export class AccountFacade {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus, private eventBus: EventBus) {}

    async getAccountForCar(carId: string) {
        return this.queryBus.execute(new GetAccountForCarQuery(carId));
    }

    async getAccountForAllCars() {
        return this.queryBus.execute(new GetAccountForAllCarsQuery());
    }
}
