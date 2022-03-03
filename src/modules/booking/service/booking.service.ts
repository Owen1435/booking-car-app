import { Injectable } from '@nestjs/common';
import { WrongDatesException } from 'src/common/exeptions';
import { BookingRepository } from '../repository/booking.repository';
import { BookCarRequestDto } from '../dto/request/book-car-request.dto';
import { ValidateBookService } from './validate-book.service';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly validateBookService: ValidateBookService,
  ) {}

  public async bookCar(bookingDto: BookCarRequestDto): Promise<void> {
    const lastBooking = await this.bookingRepository.getLastBookingByAutoId(
      bookingDto.autoId,
    );
    const lastBookingDate = lastBooking ? lastBooking.end_date : undefined;
    const start = new Date(bookingDto.startDate);

    if ( this.validateBookService.isAutoAvailableToBook(start, lastBookingDate)) {
      await this.bookingRepository.bookCar({
        autoId: bookingDto.autoId,
        rateId: bookingDto.rateId,
        startDate: bookingDto.startDate,
        endDate: bookingDto.endDate,
      });
      return;
    }

    throw new WrongDatesException();
  }
}
