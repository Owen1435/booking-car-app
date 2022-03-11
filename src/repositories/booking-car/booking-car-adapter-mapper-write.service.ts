import { BookingCarModel } from './interfaces/booking-car.model';
import { BookingCarDomain } from "@booking-car/domain/booking-car-domain";

/** Маппер сохранения в базу данных */
export class BookingCarAdapterMapperWriteService {

    public bookingCarModel = (bookingCar: BookingCarDomain): BookingCarModel => ({
        id: Number(bookingCar.id),
        carId: Number(bookingCar.carId),
        rateId: Number(bookingCar.rateId),
        startDate: bookingCar.startDate,
        endDate: bookingCar.endDate,
    })
}
