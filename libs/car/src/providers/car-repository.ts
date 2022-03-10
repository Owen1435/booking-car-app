import {Car} from "@car/domain/car";

/** Репозиторий домена */
export interface CarRepository {
    findOneById(id: string): Promise<Car>;
    findAll(): Promise<Car[]>;
}
