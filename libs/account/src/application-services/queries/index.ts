import {
    GetAccountForCarHandler
} from "@account/application-services/queries/get-account-for-car/get-account-for-car.handler";
import {
    GetAccountForAllCarsHandler
} from "@account/application-services/queries/get-account-for-all-cars/get-account-for-all-cars.handler";

/** доменные запросы */
export const QUERY_HANDLERS = [GetAccountForCarHandler, GetAccountForAllCarsHandler];
