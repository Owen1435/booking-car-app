import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCarQuery } from './get-car.query';
import { CarRepository } from '@car/providers';
import { CarDomainService } from '@car/domain-services/car-domain.service';
import { GetCarResponseDto } from '@car/application-services/queries/get-car/get-car.response.dto';
import { EntityNotFoundException } from '@common/exeptions';
import { Inject } from '@nestjs/common';

@QueryHandler(GetCarQuery)
export class GetCarHandler implements ICommandHandler<GetCarQuery> {
  constructor(@Inject('CarRepository') private repository: CarRepository) {}

  async execute(command: GetCarQuery): Promise<GetCarResponseDto> {
    const { carId } = command;
    const car = await this.repository.findCarById(carId);
    if (!car) {
      throw new EntityNotFoundException('Car');
    }

    return new CarDomainService(car);
  }
}
