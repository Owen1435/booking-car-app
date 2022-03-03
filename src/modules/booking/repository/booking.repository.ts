import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { DbClientService } from 'src/common/db-client/dbClient.service';
import { DatabaseException } from 'src/common/exeptions/database.exception';
import { BookCarRequestDto } from '../dto/request/book-car-request.dto';
import { CarBookingEntity } from '../../../common/entities';

@Injectable()
export class BookingRepository {
  client: Client;

  constructor(private readonly dbService: DbClientService) {
    this.client = this.dbService.getClient();
  }

  public async bookCar(booking: BookCarRequestDto): Promise<void> {
    try {
      await this.client.query(`
        INSERT INTO car_booking(auto_id, start_date, end_date)
        VALUES (${booking.autoId}, '${booking.startDate}', '${booking.endDate}')
      `);
    } catch (err) {
      throw new DatabaseException();
    }
  }

  public async getLastBookingByAutoId( autoId: number ): Promise<CarBookingEntity> {
    try {
      const res = await this.client.query(`
        SELECT end_date
        FROM car_booking
		WHERE auto_id = ${autoId}
		ORDER BY end_date DESC
		LIMIT 1
	  `);
      return res.rows[0];
    } catch (err) {
      throw new DatabaseException();
    }
  }
}
