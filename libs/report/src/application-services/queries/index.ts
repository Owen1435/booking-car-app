import { GetReportForAllCarsHandler } from "./get-report-for-all-cars/get-report-for-all-cars.handler";
import { GetReportForCarHandler } from "./get-report-for-car/get-report-for-car.handler";

/** доменные запросы */
export const QUERY_HANDLERS = [GetReportForCarHandler, GetReportForAllCarsHandler];
