import {Car} from "./car";

export class CarDomain implements Car {
    id: number = Date.now();
    brand: string = null;
    model: string = null;
    licensePlate: string = null;
    vin: string = null;

    constructor(car: Car = null) {
        if (!!car) {
            Object.assign(this, car);
        }
    }
}