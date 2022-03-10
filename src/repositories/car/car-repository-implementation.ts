import { Injectable } from '@nestjs/common';
import { DbClientService } from 'src/common/db-client/db-client.service';
import {CarModel} from "./interfaces/car.model";

@Injectable()
export class CarRepositoryImplementation{
  constructor(private db: DbClientService) {}

  async findOneById(carId: number): Promise<CarModel> {
    return await this.db.row<CarModel>(`
        SELECT *
        FROM cars
        WHERE id = ${carId}
      `);
  }

  async findAll(): Promise<CarModel[]> {
    return await this.db.rows<CarModel>(`
        SELECT *
        FROM cars
      `);
  }
}
