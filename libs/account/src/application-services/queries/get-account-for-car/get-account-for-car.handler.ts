import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AccountRepository } from '@account/providers';
import {
    GetAccountForCarResponseDto
} from "@account/application-services/queries/get-account-for-car/get-account-for-car.response.dto";
import {
    GetAccountForCarQuery
} from "@account/application-services/queries/get-account-for-car/get-account-for-car.query";
import {CarRepository} from "@car/providers";
import {HttpException} from "@nestjs/common/exceptions/http.exception";

@QueryHandler(GetAccountForCarQuery)
export class GetAccountForCarHandler implements ICommandHandler<GetAccountForCarQuery> {
    constructor(
        @Inject('AccountRepository') private accountRepository: AccountRepository,
        @Inject('CarRepository') private carRepository: CarRepository,
    ) {}

    async execute(command: GetAccountForCarQuery): Promise<GetAccountForCarResponseDto> {
        const { carId } = command

        const car = await this.carRepository.findCarById(carId)
        if (!car) {
            throw new HttpException('Car has been not found', 404);
        }

        return await this.accountRepository.getAccountForCar(carId);
    }
}
