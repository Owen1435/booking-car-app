import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { DbClientService } from 'src/common/db-client/dbClient.service';
import { DatabaseException } from 'src/common/exeptions/database.exception';
import { CarEntity } from '../../../common/entities';

@Injectable()
export class CarRepository {
  client: Client;
  constructor(private dbService: DbClientService) {
    this.client = this.dbService.getClient();
  }
  async getCarById(carId: number): Promise<CarEntity> {
    try {
      const result = await this.client.query(`
        SELECT *
        FROM cars
        WHERE id = ${carId}
      `);
      return result.rows[0];
    } catch (err) {
      throw new DatabaseException();
    }
  }

  async getAllCars(): Promise<CarEntity[]> {
    try {
      const result = await this.client.query(`
        SELECT *
        FROM cars
      `);
      return result.rows;
    } catch (err) {
      throw new DatabaseException();
    }
  }
}
