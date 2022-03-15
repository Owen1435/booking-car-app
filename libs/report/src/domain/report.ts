import {DayOfWeek} from "@common/enum/day-of-week.enum";

export interface Report {

}

export interface CarLoadByDay extends Report {
    carId: number;
    carLoad: DayLoad[];
}

export interface CarsLoadByDay extends Report {
    carsLoad: DayLoad[];
}

export interface DayLoad {
    day: DayOfWeek;
    percent: number;
}