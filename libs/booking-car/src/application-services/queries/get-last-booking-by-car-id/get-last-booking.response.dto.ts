import {BookingCar} from "@booking-car/domain/booking-car";

export class GetLastBookingResponseDto implements BookingCar {
    id: string;
    carId: string;
    rateId: string;
    startDate: Date;
    endDate: Date;
}
