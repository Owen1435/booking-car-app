import { Module } from '@nestjs/common';
import {CarController} from "./car/car.controller";
import {PriceController} from "./price/price.controller";
import {BookingController} from "./booking/booking.controller";
import {AccountController} from "./account/account.controller";

@Module({
    controllers: [
        CarController,
        PriceController,
        BookingController,
        AccountController
    ],
})
export class ControllersModule {}
