import { CarModel } from './interfaces/car.model';

import {CarDomain} from "@car/domain/car-domain";

/** Маппер работы с базой данных */
export class CarAdapterMapperReadService {

    public car = (car: CarModel): CarDomain =>
        !!car
            ? {
                id: car.id,
                brand: car.brand ?? null,
                model: car.model ?? null,
                licensePlate: car.licensePlate ?? null,
                vin: car.vin ?? null
            }
            : null;
}
