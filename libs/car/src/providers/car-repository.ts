import { Car } from '@car/domain/car';

/** Репозиторий домена */
export interface CarRepository {
  findCarById(carId: number): Promise<Car>;
  findAll(): Promise<Car[]>;
}
