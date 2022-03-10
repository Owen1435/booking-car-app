import {Car} from "@car/domain/car";

/** Репозиторий домена */
export interface CarRepository {
    findCarById(id: string): Promise<Car>;
    findAll(): Promise<Car[]>;
}
