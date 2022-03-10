import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { CarRepository } from '@car/providers';
import { Car } from "@car/domain/car";
import {GetAllCarsQuery} from "@car/application-services/queries/get-all-cars/get-all-cars.query";
import { Inject } from '@nestjs/common';
import {GetAllCarsResponseDto} from "@car/application-services/queries/get-all-cars/get-all-cars.response.dto";

@QueryHandler(GetAllCarsQuery)
export class GetAllCarsHandler implements ICommandHandler<GetAllCarsQuery> {
    constructor(@Inject('CarRepository') private repository: CarRepository) {}

    async execute(command: GetAllCarsQuery): Promise<GetAllCarsResponseDto> {
        const cars: Car[] = await this.repository.findAll();
        return {
            cars
        };
    }
}
