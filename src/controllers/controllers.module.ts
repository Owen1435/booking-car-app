import { Module } from '@nestjs/common';
import {CarController} from "./car/car.controller";

@Module({
    controllers: [
        CarController
    ],
})
export class ControllersModule {}
