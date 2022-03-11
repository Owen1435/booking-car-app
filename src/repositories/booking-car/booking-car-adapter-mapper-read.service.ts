import {BookingCarModel} from "./interfaces/booking-car.model";
import {BookingCarDomain} from "@booking-car/domain/booking-car-domain";

/** Маппер работы с базой данных */
export class BookingCarAdapterMapperReadService {

    public bookingCar = (bookingCar: BookingCarModel): BookingCarDomain =>
        !!bookingCar
            ? {
                id: bookingCar.id.toString(),
                carId: bookingCar.carId.toString(),
                rateId: bookingCar.rateId.toString(),
                startDate: bookingCar.startDate,
                endDate: bookingCar.endDate,
            }
            : null;
}
