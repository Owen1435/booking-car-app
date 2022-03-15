import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { BookCarCommand } from './commands/book-car/book-car.command';
import { BookCarRequestDto } from '../../../../src/controllers/booking/dto/book-car-request.dto';

/** класс-фасад */
@Injectable()
export class BookingCarFacade {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private eventBus: EventBus,
  ) {}

  async bookCar({ carId, rateId, startDate, endDate }: BookCarRequestDto) {
    return this.commandBus.execute(
      new BookCarCommand(carId, rateId, startDate, endDate),
    );
  }
}
