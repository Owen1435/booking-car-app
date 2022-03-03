import { Client } from 'pg';
import { Injectable } from '@nestjs/common';
import { DbClientService } from 'src/common/db-client/dbClient.service';
import { DatabaseException } from 'src/common/exeptions/database.exception';
import { IAccount } from 'src/common/interfaces/account.interface';

@Injectable()
export class AccountRepository {
  client: Client;

  constructor(protected dbService: DbClientService) {
    this.client = this.dbService.getClient();
  }

  async getAccountForCar(autoId: number): Promise<IAccount[]> {
    try {
      const result = await this.client.query(`
        SELECT q1.day_of_week, ((q1.count * 1.0) / (q2.total_count * 1.0)) * 100 as percent
        FROM
          (SELECT EXTRACT(ISODOW FROM day) as day_of_week, count(day) as count
          FROM car_booking, generate_series(start_date, end_date, interval '1 day') as day
          WHERE car_booking.auto_id = ${autoId}
          GROUP BY auto_id, day_of_week) as q1,
          (SELECT count(day) as total_count
          FROM car_booking, generate_series(car_booking.start_date, car_booking.end_date, interval '1 day') AS day
          WHERE car_booking.auto_id = ${autoId}) as q2
        ORDER BY q1.day_of_week
      `);
      return result.rows;
    } catch (err) {
      throw new DatabaseException();
    }
  }

  async getAccountForAllCars(): Promise<IAccount[]> {
    try {
      const test = await this.client.query(`
        SELECT q1.day_of_week, ((q1.count * 1.0) / (q2.total_count * 1.0)) * 100 as percent
        FROM
            (SELECT EXTRACT(ISODOW FROM day) as day_of_week, count(day) as count
            FROM car_booking, generate_series(start_date, end_date, interval '1 day') AS day
            GROUP BY day_of_week) as q1,
        (SELECT count(day) as total_count
        FROM car_booking, generate_series(start_date, end_date, interval '1 day') AS day) as q2
        ORDER BY q1.day_of_week
      `);
      return test.rows;
    } catch (err) {
      throw new DatabaseException();
    }
  }
}
