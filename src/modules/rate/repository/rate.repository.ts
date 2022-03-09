import { Injectable } from '@nestjs/common';
import { DbClientService } from 'src/common/db-client/db-client.service';
import { RateEntity } from '../../../common/entities';
import { DatabaseException } from 'src/common/exeptions';

@Injectable()
export class RateRepository {
  constructor(private readonly db: DbClientService) {}

  public async getRateById(rateId: number): Promise<RateEntity> {
    try {
      return await this.db.row(`
        SELECT * 
        FROM rate 
        WHERE id=${rateId}
      `);
    } catch (err) {
      throw new DatabaseException(err.message);
    }
  }
}