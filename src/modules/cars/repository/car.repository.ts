import { Injectable } from '@nestjs/common';
import { DbClientService } from 'src/common/db-client/db-client.service';
import { DatabaseException } from 'src/common/exeptions/database.exception';
import { CarEntity } from '../../../common/entities';

@Injectable()
export class CarRepository {
  constructor(private db: DbClientService) {}

  async getCarById(carId: number): Promise<CarEntity> {
    try {
      const result = await this.db.getClient().query(`
        SELECT *
        FROM cars
        WHERE id = ${carId}
      `);
      return result.rows[0];
    } catch (err) {
      throw new DatabaseException(err.message);
    }
  }

  async getAllCars(): Promise<CarEntity[]> {
    try {
      const result = await this.db.getClient().query(`
        SELECT id, brand, model, license_plate as licensePlate, vin
        FROM cars
      `);
      return result.rows;
    } catch (err) {
      throw new DatabaseException(err.message);
    }
  }
}
