import { Injectable } from '@nestjs/common';
import { DbClientService } from 'src/common/db-client/db-client.service';
import { DatabaseException } from 'src/common/exeptions/database.exception';
import { CarEntity } from '../../../common/entities';

@Injectable()
export class CarRepository {
  constructor(private db: DbClientService) {}

  async getCarById(carId: number): Promise<CarEntity> {
    try {
      return await this.db.row<CarEntity>(`
        SELECT *
        FROM cars
        WHERE id = ${carId}
      `);
    } catch (err) {
      throw new DatabaseException(err.message);
    }
  }

  async getAllCars(): Promise<CarEntity[]> {
    try {
      return await this.db.rows<CarEntity>(`
        SELECT *
        FROM cars
      `);
    } catch (err) {
      throw new DatabaseException(err.message);
    }
  }
}
