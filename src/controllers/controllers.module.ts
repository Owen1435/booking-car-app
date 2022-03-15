import { Module } from '@nestjs/common';
import {CarController} from "./car/car.controller";
import {PriceController} from "./price/price.controller";
import {BookingController} from "./booking/booking.controller";
import {ReportController} from "./report/report.controller";

@Module({
    controllers: [
        CarController,
        PriceController,
        BookingController,
        ReportController
    ],
})
export class ControllersModule {}
