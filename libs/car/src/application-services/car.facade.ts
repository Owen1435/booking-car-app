import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { GetAllCarsQuery } from './queries/get-all-cars/get-all-cars.query';
import { GetCarQuery } from './queries/get-car/get-car.query';

/** класс-фасад */
@Injectable()
export class CarFacade {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private eventBus: EventBus,
  ) {}

  async getCar(carId: number) {
    return this.queryBus.execute(new GetCarQuery(carId));
  }

  async getAllCars() {
    return this.queryBus.execute(new GetAllCarsQuery());
  }
}
