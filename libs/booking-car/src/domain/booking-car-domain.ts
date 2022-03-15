import {BookingCar} from "./booking-car";

export class BookingCarDomain implements BookingCar {
    id: number = Date.now();
    carId: number = null;
    rateId: number = null;
    startDate: Date = null;
    endDate: Date = null;

    constructor(bookingCar: BookingCar = null) {
        if (!!bookingCar) {
            Object.assign(this, bookingCar);
        }
    }
}