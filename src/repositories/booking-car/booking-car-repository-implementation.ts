import { Injectable } from '@nestjs/common';
import { DbClientService } from 'src/common/db-client/db-client.service';
import {BookingCarModel} from "./interfaces/booking-car.model";

@Injectable()
export class BookingCarRepositoryImplementation{
  constructor(private db: DbClientService) {}

  async bookCar(bookingCar: BookingCarModel): Promise<void> {
    await this.db.sql(`
        INSERT INTO car_booking("carId", "rateId", "startDate", "endDate")
        VALUES (${bookingCar.carId}, ${bookingCar.rateId}, '${bookingCar.startDate.toISOString()}', '${bookingCar.endDate.toISOString()}')
      `);
    return;
  }

  async getLastBookingByAutoId(carId: number): Promise<BookingCarModel> {
    return await this.db.row(`
        SELECT *
        FROM car_booking
		WHERE "carId" = ${carId}
		ORDER BY "endDate" DESC
		LIMIT 1
	  `);
  }
}
