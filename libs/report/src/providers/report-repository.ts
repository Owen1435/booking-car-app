import { GetReportForAllCarsResponseDto } from "@report/application-services/queries/get-report-for-all-cars/get-report-for-all-cars.response.dto"
import { GetReportForCarResponseDto } from "@report/application-services/queries/get-report-for-car/get-report-for-car.response.dto"

/** Репозиторий домена */
export interface ReportRepository {
    getReportForCar(carId: number): Promise<GetReportForCarResponseDto>
    getReportForAllCars(): Promise<GetReportForAllCarsResponseDto>
}
