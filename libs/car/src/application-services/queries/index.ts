import {GetCarHandler} from "@car/application-services/queries/get-car/get-car.handler";
import {GetAllCarsHandler} from "@car/application-services/queries/get-all-cars/get-all-cars.handler";

/** доменные запросы */
export const QUERY_HANDLERS = [GetCarHandler, GetAllCarsHandler];
