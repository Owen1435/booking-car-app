import {Car} from "./car";

export class CarDomain implements Car {
    id: string = Date.now().toString();
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