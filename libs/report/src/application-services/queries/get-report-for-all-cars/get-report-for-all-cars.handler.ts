import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReportRepository } from '@report/providers';
import {
    GetReportForAllCarsQuery
} from "@report/application-services/queries/get-report-for-all-cars/get-report-for-all-cars.query";
import {
    GetReportForAllCarsResponseDto
} from "@report/application-services/queries/get-report-for-all-cars/get-report-for-all-cars.response.dto";

@QueryHandler(GetReportForAllCarsQuery)
export class GetReportForAllCarsHandler implements ICommandHandler<GetReportForAllCarsQuery> {
    constructor(
        @Inject('ReportRepository') private accountRepository: ReportRepository,
    ) {}

    async execute(command: GetReportForAllCarsQuery): Promise<GetReportForAllCarsResponseDto> {
        return this.accountRepository.getReportForAllCars();
    }
}
