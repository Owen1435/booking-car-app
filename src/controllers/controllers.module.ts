import { Module } from '@nestjs/common';
import {CarController} from "./car/car.controller";
import {PriceController} from "./price/price.controller";
import {BookingController} from "./booking/booking.controller";

@Module({
    controllers: [
        CarController,
        PriceController,
        BookingController
    ],
})
export class ControllersModule {}
