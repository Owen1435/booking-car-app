import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { GetLastBookingByCarIdQuery } from './queries/get-last-booking-by-car-id/get-last-booking-by-car-id.query';
import { BookCarCommand } from './commands/book-car/book-car.command';

/** класс-фасад */
@Injectable()
export class BookingCarFacade {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus, private eventBus: EventBus) {}

    async bookCar(carId: string, rateId: string, startDate: string, endDate: string) {
        return this.commandBus.execute(new BookCarCommand(carId, rateId, startDate, endDate));
    }

    async getLastBookingByCarId(carId: string) {
        return this.queryBus.execute(new GetLastBookingByCarIdQuery(carId));
    }
}
