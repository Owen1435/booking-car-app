import { Injectable } from '@nestjs/common';
import { DbClientService } from 'src/common/db-client/db-client.service';
import { DatabaseException } from 'src/common/exeptions';
import { DiscountEntity } from '../../../common/entities';

@Injectable()
export class DiscountRepository {
  constructor(private readonly db: DbClientService) {}

  public async getDiscountByDays(days: number): Promise<DiscountEntity> {
    try {
      return await this.db.row(`
        SELECT *
        FROM discount
        WHERE "fromDays" <= ${days} and "toDays" >= ${days}
      `);
    } catch (err) {
      throw new DatabaseException(err.message);
    }
  }
}
