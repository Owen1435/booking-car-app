import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { GetReportForCarQuery } from './queries/get-report-for-car/get-report-for-car.query';
import { GetReportForAllCarsQuery } from './queries/get-report-for-all-cars/get-report-for-all-cars.query';

/** класс-фасад */
@Injectable()
export class ReportFacade {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus, private eventBus: EventBus) {}

    async getReportForCar(carId: number) {
        return this.queryBus.execute(new GetReportForCarQuery(carId));
    }

    async getReportForAllCars() {
        return this.queryBus.execute(new GetReportForAllCarsQuery());
    }
}
