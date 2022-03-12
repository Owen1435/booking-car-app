import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AccountRepository } from '@account/providers';
import {
    GetAccountForAllCarsQuery
} from "@account/application-services/queries/get-account-for-all-cars/get-account-for-all-cars.query";
import {
    GetAccountForAllCarsResponseDto
} from "@account/application-services/queries/get-account-for-all-cars/get-account-for-all-cars.response.dto";

@QueryHandler(GetAccountForAllCarsQuery)
export class GetAccountForAllCarsHandler implements ICommandHandler<GetAccountForAllCarsQuery> {
    constructor(
        @Inject('AccountRepository') private accountRepository: AccountRepository,
    ) {}

    async execute(command: GetAccountForAllCarsQuery): Promise<GetAccountForAllCarsResponseDto> {
        return await this.accountRepository.getAccountForAllCars();
    }
}
