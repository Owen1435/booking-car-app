import { Module } from '@nestjs/common';
import {CarController} from "./car/car.controller";
import {PriceController} from "./price/price.controller";

@Module({
    controllers: [
        CarController,
        PriceController
    ],
})
export class ControllersModule {}
