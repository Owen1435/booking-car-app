import { Injectable } from '@nestjs/common';
import { DbClientService } from 'src/common/db-client/db-client.service';
import { AccountForAllCarsModel } from './interfaces/account-for-all-cars.model';
import { AccountForCarModel } from "./interfaces/account-for-car.model";

@Injectable()
export class AccountRepositoryImplementation{
  constructor(private db: DbClientService) {}

  async getAccountForCar(carId: number): Promise<AccountForCarModel[]> {
    return await this.db.rows<AccountForCarModel>(`
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

  async getAccountForAllCars(): Promise<AccountForAllCarsModel[]> {
    return await this.db.rows<AccountForAllCarsModel>(`
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
