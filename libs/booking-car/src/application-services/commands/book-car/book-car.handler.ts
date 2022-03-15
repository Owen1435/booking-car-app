import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BookCarCommand } from './book-car.command';
import { Inject } from '@nestjs/common';
import { BookingCarRepository } from '@booking-car/providers';
import { BookingCarDomainService } from '@booking-car/domain-services/booking-car-domain.service';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { MILLISECONDS_IN_DAY } from 'libs/common/src/constants';
import { DAYS_BETWEEN_BOOKING } from 'libs/common/src/constants/busines-logic.constant';
import { RateRepository } from '@rate/providers';
import { CarRepository } from '@car/providers';
import { EntityNotFoundException } from '@common/exeptions';
import {plainToClass} from "class-transformer";

@CommandHandler(BookCarCommand)
export class BookCarHandler implements ICommandHandler<BookCarCommand> {
  constructor(
    @Inject('BookingCarRepository') private repository: BookingCarRepository,
    @Inject('RateRepository') private rateRepository: RateRepository,
    @Inject('CarRepository') private carRepository: CarRepository,
  ) {}

  async execute(command: BookCarCommand): Promise<void> {
    const { carId, rateId, startDate, endDate } = command;

    const car = await this.carRepository.findCarById(carId);
    if (!car) {
      throw new EntityNotFoundException('Car');
    }

    const rate = await this.rateRepository.findRateById(rateId);
    if (!rate) {
      throw new EntityNotFoundException('Rate');
    }

    const lastBooking = await this.repository.getLastBookingByCarId(carId);
    const lastBookingDate = lastBooking ? lastBooking.endDate : undefined;
    const start = new Date(startDate);

    if (BookCarHandler.isAutoAvailableToBook(start, lastBookingDate)) {
        const bookingCar = plainToClass(BookingCarDomainService, {
            carId,
            rateId,
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        })
        await this.repository.bookCar(bookingCar);
        return;
    }

    throw new HttpException(
      `You can book this car only ${DAYS_BETWEEN_BOOKING} days after the last booking (${lastBooking.endDate})`,
      400,
    );
  }

  private static isAutoAvailableToBook(
    start: Date,
    lastBooking: Date,
  ): boolean {
    if (!lastBooking) {
      return true;
    }
    const days =
      (start.getTime() - lastBooking.getTime()) / MILLISECONDS_IN_DAY;
    return days >= DAYS_BETWEEN_BOOKING;
  }
}
