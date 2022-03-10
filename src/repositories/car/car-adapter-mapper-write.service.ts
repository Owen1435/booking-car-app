import { CarModel } from './interfaces/car.model';
import {CarDomain} from "@car/domain/car-domain";

/** Маппер сохранения в базу данных */
export class CarAdapterMapperWriteService {

    public carModel = (car: CarDomain): CarModel => ({
        id: Number(car.id),
        brand: car.brand,
        model: car.model,
        licensePlate: car.licensePlate,
        vin: car.vin
    })
}
