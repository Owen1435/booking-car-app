import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AccountRepository } from '@account/providers';
import {
    GetAccountForCarResponseDto
} from "@account/application-services/queries/get-account-for-car/get-account-for-car.response.dto";
import {
    GetAccountForCarQuery
} from "@account/application-services/queries/get-account-for-car/get-account-for-car.query";

@QueryHandler(GetAccountForCarQuery)
export class GetAccountForCarHandler implements ICommandHandler<GetAccountForCarQuery> {
    constructor(
        @Inject('AccountRepository') private accountRepository: AccountRepository,
    ) {}

    async execute(command: GetAccountForCarQuery): Promise<GetAccountForCarResponseDto> {
        const { carId } = command
        return await this.accountRepository.getAccountForCar(carId);
    }
}
