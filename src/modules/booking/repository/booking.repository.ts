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
      await this.db.sql(`
        INSERT INTO car_booking("autoId", "rateId", "startDate", "endDate")
        VALUES (${booking.autoId}, ${booking.rateId}, '${booking.startDate}', '${booking.endDate}')
      `);
    } catch (err) {
      throw new DatabaseException(err.message);
    }
  }

  public async getLastBookingByAutoId( autoId: number ): Promise<CarBookingEntity> {
    try {
      return await this.db.row(`
        SELECT "endDate"
        FROM car_booking
		WHERE "autoId" = ${autoId}
		ORDER BY "endDate" DESC
		LIMIT 1
	  `);
    } catch (err) {
      throw new DatabaseException(err.message);
    }
  }
}
