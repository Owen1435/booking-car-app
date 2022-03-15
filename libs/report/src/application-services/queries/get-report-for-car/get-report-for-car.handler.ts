import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReportRepository } from '@report/providers';
import { GetReportForCarResponseDto } from '@report/application-services/queries/get-report-for-car/get-report-for-car.response.dto';
import { GetReportForCarQuery } from '@report/application-services/queries/get-report-for-car/get-report-for-car.query';
import { CarRepository } from '@car/providers';
import { EntityNotFoundException } from '@common/exeptions';

@QueryHandler(GetReportForCarQuery)
export class GetReportForCarHandler
  implements ICommandHandler<GetReportForCarQuery>
{
  constructor(
    @Inject('ReportRepository') private accountRepository: ReportRepository,
    @Inject('CarRepository') private carRepository: CarRepository,
  ) {}

  async execute(command: GetReportForCarQuery): Promise<GetReportForCarResponseDto> {
    const { carId } = command;

    const car = await this.carRepository.findCarById(carId);
    if (!car) {
      throw new EntityNotFoundException('Car');
    }

    return await this.accountRepository.getReportForCar(carId);
  }
}
