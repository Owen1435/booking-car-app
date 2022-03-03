import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { DbClientService } from 'src/common/db-client/dbClient.service';
import { DatabaseException } from 'src/common/exeptions';
import { DiscountEntity } from '../../../common/entities';

@Injectable()
export class DiscountRepository {
  client: Client;

  constructor(private readonly dbService: DbClientService) {
    this.client = this.dbService.getClient();
  }

  public async getDiscountByDays(days: number): Promise<DiscountEntity> {
    try {
      const res = await this.client.query(`
        SELECT *
        FROM discount
        WHERE from_days <= ${days} and to_days >= ${days}
      `);
      return res.rows[0];
    } catch (err) {
      throw new DatabaseException();
    }
  }
}
