import { Injectable } from '@nestjs/common';
import { WrongDatesException } from 'src/common/exeptions';
import { BookingRepository } from '../repository/booking.repository';
import { BookCarRequestDto } from '../dto/request/book-car-request.dto';
import {MILLISECONDS_IN_DAY} from "../../../common/constants";
import {DAYS_BETWEEN_BOOKING} from "../../../common/constants/busines-logic.constant";
import {HttpException} from "@nestjs/common/exceptions/http.exception";

@Injectable()
export class BookingService {
  constructor( private readonly bookingRepository: BookingRepository ) {}

  public async bookCar(bookingDto: BookCarRequestDto): Promise<void> {
    const lastBooking = await this.bookingRepository.getLastBookingByAutoId( bookingDto.autoId );
    const lastBookingDate = lastBooking ? lastBooking.endDate : undefined;
    const start = new Date(bookingDto.startDate);

    if ( BookingService.isAutoAvailableToBook(start, lastBookingDate)) {
      try {
        return await this.bookingRepository.bookCar({
          autoId: bookingDto.autoId,
          rateId: bookingDto.rateId,
          startDate: bookingDto.startDate,
          endDate: bookingDto.endDate,
        });
      } catch (err) {
        throw new HttpException(err.message, 400);
      }
    }

    throw new WrongDatesException();
  }

  private static isAutoAvailableToBook(start: Date, lastBooking: string): boolean {
    if (!lastBooking) return true;

    const lastEndDate = new Date(lastBooking);
    const days = (start.getTime() - lastEndDate.getTime()) / MILLISECONDS_IN_DAY;

    return days >= DAYS_BETWEEN_BOOKING;
  }
}
