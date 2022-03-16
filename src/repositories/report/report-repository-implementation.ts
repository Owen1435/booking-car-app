import { Injectable } from '@nestjs/common';
import { DbClientService } from 'src/common/db-client/db-client.service';
import { ReportForAllCarsModel } from './interfaces/report-for-all-cars.model';
import { ReportForCarModel } from "./interfaces/report-for-car.model";

@Injectable()
export class ReportRepositoryImplementation {
  constructor(private db: DbClientService) {}

  async getReportForCar(carId: number): Promise<ReportForCarModel[]> {
    return this.db.rows<ReportForCarModel>(`
        SELECT q1.day_of_week as "dayOfWeek", ((q1.count * 1.0) / (q2.total_count * 1.0)) * 100 as percent
        FROM
          (SELECT EXTRACT(ISODOW FROM day) as day_of_week, count(day) as count
          FROM car_booking, generate_series("startDate", "endDate", interval '1 day') as day
          WHERE "carId" = ${carId}
          GROUP BY "carId", day_of_week) as q1,
          (SELECT count(day) as total_count
          FROM car_booking, generate_series("startDate", "endDate", interval '1 day') AS day
          WHERE "carId" = ${carId}) as q2
        ORDER BY q1.day_of_week
      `);
  }

  async getReportForAllCars(): Promise<ReportForAllCarsModel[]> {
    return this.db.rows<ReportForAllCarsModel>(`
        SELECT q1.day_of_week as "dayOfWeek", ((q1.count * 1.0) / (q2.total_count * 1.0)) * 100 as percent
        FROM
            (SELECT EXTRACT(ISODOW FROM day) as day_of_week, count(day) as count
            FROM car_booking, generate_series("startDate", "endDate", interval '1 day') as day
            GROUP BY day_of_week) as q1,
        (SELECT count(day) as total_count
        FROM car_booking, generate_series("startDate", "endDate", interval '1 day') AS day) as q2
        ORDER BY q1.day_of_week
      `);
  }
}
