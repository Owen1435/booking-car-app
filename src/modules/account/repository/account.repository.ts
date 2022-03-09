import { Injectable } from '@nestjs/common';
import { DbClientService } from 'src/common/db-client/db-client.service';
import { DatabaseException } from 'src/common/exeptions/database.exception';
import { Account } from 'src/common/interfaces/account.interface';

@Injectable()
export class AccountRepository {
  constructor(protected db: DbClientService) {}

  async getAccountForCar(autoId: number): Promise<Account[]> {
    try {
      const result = await this.db.getClient().query(`
        SELECT q1.day_of_week as "dayOfWeek", ((q1.count * 1.0) / (q2.total_count * 1.0)) * 100 as percent
        FROM
          (SELECT EXTRACT(ISODOW FROM day) as day_of_week, count(day) as count
          FROM car_booking, generate_series("startDate", "endDate", interval '1 day') as day
          WHERE "autoId" = ${autoId}
          GROUP BY "autoId", day_of_week) as q1,
          (SELECT count(day) as total_count
          FROM car_booking, generate_series("startDate", "endDate", interval '1 day') AS day
          WHERE "autoId" = ${autoId}) as q2
        ORDER BY q1.day_of_week
      `);
      return result.rows;
    } catch (err) {
      throw new DatabaseException();
    }
  }

  async getAccountForAllCars(): Promise<Account[]> {
    try {
      const test = await this.db.getClient().query(`
        SELECT q1.day_of_week as "dayOfWeek", ((q1.count * 1.0) / (q2.total_count * 1.0)) * 100 as percent
        FROM
            (SELECT EXTRACT(ISODOW FROM day) as day_of_week, count(day) as count
            FROM car_booking, generate_series("startDate", "endDate", interval '1 day') as day
            GROUP BY day_of_week) as q1,
        (SELECT count(day) as total_count
        FROM car_booking, generate_series("startDate", "endDate", interval '1 day') AS day) as q2
        ORDER BY q1.day_of_week
      `);
      return test.rows;
    } catch (err) {
      throw new DatabaseException();
    }
  }
}
