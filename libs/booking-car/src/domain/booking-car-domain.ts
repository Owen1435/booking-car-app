import {BookingCar} from "./booking-car";

export class BookingCarDomain implements BookingCar {
    id: string = Date.now().toString();
    carId: string = null;
    rateId: string = null;
    startDate: Date = null;
    endDate: Date = null;

    constructor(bookingCar: BookingCar = null) {
        if (!!bookingCar) {
            Object.assign(this, bookingCar);
        }
    }
}