import { Injectable } from '@nestjs/common';
import { DbClientService } from 'src/common/db-client/db-client.service';
import {RateModel} from "./interfaces/rate.model";

@Injectable()
export class RateRepositoryImplementation{
  constructor(private db: DbClientService) {}

  async findRateById(rateId: number): Promise<RateModel> {
    return await this.db.row(`
        SELECT * 
        FROM rate 
        WHERE id=${rateId}
      `);
  }
}
