import { Injectable } from '@nestjs/common';
import { DbClientService } from 'src/common/db-client/db-client.service';
import {DiscountModel} from "./interfaces/discount.model";

@Injectable()
export class DiscountRepositoryImplementation{
  constructor(private db: DbClientService) {}

  async findOneByDays(days: number): Promise<DiscountModel> {
    return await this.db.row(`
        SELECT *
        FROM discount
        WHERE "fromDays" <= ${days} and "toDays" >= ${days}
      `);
  }
}
