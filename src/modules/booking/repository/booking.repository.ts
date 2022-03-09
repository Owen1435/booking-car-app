import { Injectable } from '@nestjs/common';
import { DbClientService } from 'src/common/db-client/db-client.service';
import { DatabaseException } from 'src/common/exeptions/database.exception';
import { BookCarRequestDto } from '../dto/request/book-car-request.dto';
import { CarBookingEntity } from '../../../common/entities';

@Injectable()
export class BookingRepository {
  constructor(private readonly db: DbClientService) {}

  public async bookCar(booking: BookCarRequestDto): Promise<void> {
    try {
      await this.db.getClient().query(`
        INSERT INTO car_booking(auto_id, rate_id, start_date, end_date)
        VALUES (${booking.autoId}, ${booking.rateId}, '${booking.startDate}', '${booking.endDate}')
      `);
    } catch (err) {
      throw new DatabaseException(err.message);
    }
  }

  public async getLastBookingByAutoId( autoId: number ): Promise<CarBookingEntity> {
    try {
      const res = await this.db.getClient().query(`
        SELECT end_date
        FROM car_booking
		WHERE auto_id = ${autoId}
		ORDER BY end_date DESC
		LIMIT 1
	  `);
      return res.rows[0];
    } catch (err) {
      throw new DatabaseException(err.message);
    }
  }
}
