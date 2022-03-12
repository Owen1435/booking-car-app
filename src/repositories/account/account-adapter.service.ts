import {Injectable} from '@nestjs/common';
import {AccountRepository} from "@account/providers";
import {AccountRepositoryImplementation} from "./account-repository-implementation";
import {
    GetAccountForCarResponseDto
} from "@account/application-services/queries/get-account-for-car/get-account-for-car.response.dto";
import {
    GetAccountForAllCarsResponseDto
} from "@account/application-services/queries/get-account-for-all-cars/get-account-for-all-cars.response.dto";
import { DayOfWeek } from 'libs/common/src/enum/day-of-week.enum';
import { DatabaseException } from '@common/exeptions';

/** адаптер работы с базой данных */
@Injectable()
export class AccountAdapterService implements AccountRepository {

    constructor(private repository: AccountRepositoryImplementation) {}

    async getAccountForCar(carId: string): Promise<GetAccountForCarResponseDto> {
        try {
            if (!Number(carId)) {
                throw new Error('Is not valid car Id');
            }

            const accounts = await this.repository.getAccountForCar(Number(carId))
            return {
                carId,
                data: accounts.map(account => { return {
                    day: DayOfWeek[account.dayOfWeek],
                    percent: account.percent
                }})
            }
        } catch (err) {
            throw new DatabaseException(err.message);
        }
    }

    async getAccountForAllCars(): Promise<GetAccountForAllCarsResponseDto> {
        try {
            const accounts = await this.repository.getAccountForAllCars()
            return {
                data: accounts.map(account => { return {
                    day: DayOfWeek[account.dayOfWeek],
                    percent: account.percent
                }})
            }
        } catch (err) {
            throw new DatabaseException(err.message);
        }
    }
}
