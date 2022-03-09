import { Injectable } from '@nestjs/common';
import { DbClientService } from 'src/common/db-client/db-client.service';
import { DatabaseException } from 'src/common/exeptions';
import { DiscountEntity } from '../../../common/entities';

@Injectable()
export class DiscountRepository {
  constructor(private readonly db: DbClientService) {}

  public async getDiscountByDays(days: number): Promise<DiscountEntity> {
    try {
      const res = await this.db.getClient().query(`
        SELECT *
        FROM discount
        WHERE "fromDays" <= ${days} and "toDays" >= ${days}
      `);
      return res.rows[0];
    } catch (err) {
      throw new DatabaseException(err.message);
    }
  }
}
