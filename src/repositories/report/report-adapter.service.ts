import {Injectable} from '@nestjs/common';
import {ReportRepository} from "@report/providers";
import {ReportRepositoryImplementation} from "./report-repository-implementation";
import { DayOfWeek } from 'libs/common/src/enum/day-of-week.enum';
import { DatabaseException } from '@common/exeptions';
import { GetReportForCarResponseDto } from '@report/application-services/queries/get-report-for-car/get-report-for-car.response.dto';
import { GetReportForAllCarsResponseDto } from '@report/application-services/queries/get-report-for-all-cars/get-report-for-all-cars.response.dto';

/** адаптер работы с базой данных */
@Injectable()
export class ReportAdapterService implements ReportRepository {

    constructor(private repository: ReportRepositoryImplementation) {}

    async getReportForCar(carId: number): Promise<GetReportForCarResponseDto> {
        try {
            const accounts = await this.repository.getReportForCar(carId)
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

    async getReportForAllCars(): Promise<GetReportForAllCarsResponseDto> {
        try {
            const accounts = await this.repository.getReportForAllCars()
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
