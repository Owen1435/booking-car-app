import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import { BookCarCommand } from './book-car.command';
import {Inject} from "@nestjs/common";
import {BookingCarRepository} from "@booking-car/providers";
import {BookingCarDomainService} from "@booking-car/domain-services/booking-car-domain.service";
import {BookingCarDomain} from "@booking-car/domain/booking-car-domain";
import {MILLISECONDS_IN_DAY} from "../../../../../../src/common/constants";
import {DAYS_BETWEEN_BOOKING} from "../../../../../../src/common/constants/busines-logic.constant";
import {HttpException} from "@nestjs/common/exceptions/http.exception";
import {WrongDatesException} from "../../../../../../src/common/exeptions";

@CommandHandler(BookCarCommand)
export class BookCarHandler implements ICommandHandler<BookCarCommand> {
    constructor(@Inject('BookingCarRepository') private repository: BookingCarRepository) {}

    async execute(command: BookCarCommand): Promise<void> {
        const { carId, rateId, startDate, endDate } = command;

        const lastBooking = await this.repository.getLastBookingByCarId( carId );
        const lastBookingDate = lastBooking ? lastBooking.endDate : undefined;
        const start = new Date(startDate);

        if ( BookCarHandler.isAutoAvailableToBook(start, lastBookingDate)) {
            try {
                const bookingCar = new BookingCarDomainService(new BookingCarDomain());
                bookingCar.carId = carId
                bookingCar.rateId = rateId
                bookingCar.startDate = new Date(startDate)
                bookingCar.endDate = new Date(endDate)
                await this.repository.bookCar(bookingCar)
                return;
            } catch (err) {
                throw new HttpException(err.message, 400);
            }
        }
        throw new WrongDatesException();
    }

    private static isAutoAvailableToBook(start: Date, lastBooking: Date): boolean {
        if (!lastBooking) {
            return true;
        }
        const days = (start.getTime() - lastBooking.getTime()) / MILLISECONDS_IN_DAY;
        return days >= DAYS_BETWEEN_BOOKING;
    }
}
