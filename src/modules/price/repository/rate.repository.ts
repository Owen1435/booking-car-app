import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { DbClientService } from 'src/common/db-client/dbClient.service';
import { RateEntity } from '../../../common/entities';
import { DatabaseException } from 'src/common/exeptions';

@Injectable()
export class RateRepository {
  client: Client;

  constructor(private readonly dbService: DbClientService) {
    this.client = this.dbService.getClient();
  }

  public async getRateById(rateId: number): Promise<RateEntity> {
    try {
      const res = await this.client.query(`
        SELECT * 
        FROM rate 
        WHERE id=${rateId}
      `);
      return res.rows[0];
    } catch (err) {
      throw new DatabaseException();
    }
  }
}
