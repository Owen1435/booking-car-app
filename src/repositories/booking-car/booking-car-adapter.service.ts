import {Injectable} from '@nestjs/common';
import {BookingCarRepository} from "@booking-car/providers";
import {BookingCar} from "@booking-car/domain/booking-car";
import {BookingCarRepositoryImplementation} from "./booking-car-repository-implementation";
import {BookingCarAdapterMapperWriteService} from "./booking-car-adapter-mapper-write.service";
import {BookingCarAdapterMapperReadService} from "./booking-car-adapter-mapper-read.service";
import { DatabaseException } from '@common/exeptions';

/** адаптер работы с базой данных */
@Injectable()
export class BookingCarAdapterService implements BookingCarRepository {
    private readonly urtRead = new BookingCarAdapterMapperReadService();
    private readonly urtWrite = new BookingCarAdapterMapperWriteService();

    constructor(private repository: BookingCarRepositoryImplementation) {}

    async bookCar(bookingCar: BookingCar): Promise<void> {
        try {
            const bookingCarModel = this.urtWrite.bookingCarModel(bookingCar);
            await this.repository.bookCar(bookingCarModel)
            return;
        } catch (err) {
            throw new DatabaseException(err.message);
        }
    }

    async getLastBookingByCarId(carId: number): Promise<BookingCar> {
        try {
            const booking = await this.repository.getLastBookingByAutoId(carId)
            return this.urtRead.bookingCar(booking);
        } catch (err) {
            throw new DatabaseException(err.message);
        }
    }
}
