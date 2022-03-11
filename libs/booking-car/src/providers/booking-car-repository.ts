import {BookingCar} from "../domain/booking-car";

/** Репозиторий домена */
export interface BookingCarRepository {
    bookCar(bookingCar: BookingCar): Promise<void>;
    getLastBookingByCarId(carId: string): Promise<BookingCar>;
}
