import {Injectable} from '@nestjs/common';
import {CarRepository} from "@car/providers";
import {Car} from "@car/domain/car";
import {CarAdapterMapperReadService} from "./car-adapter-mapper-read.service";
import {CarAdapterMapperWriteService} from './car-adapter-mapper-write.service';
import {DatabaseException} from "../../common/exeptions";
import {CarRepositoryImplementation} from "./car-repository-implementation";

/** адаптер работы с базой данных */
@Injectable()
export class CarAdapterService implements CarRepository {
    private readonly urtRead = new CarAdapterMapperReadService();
    private readonly urtWrite = new CarAdapterMapperWriteService();

    constructor(private repository: CarRepositoryImplementation) {}

    async findCarById(id: string): Promise<Car> {
        try {
            if (!id || !Number(id)) {
                throw new Error('Is not valid Id');
            }

            const car = await this.repository.findCarById(Number(id))
            return this.urtRead.car(car);
        } catch (err) {
            throw new DatabaseException(err.message);
        }
    }

    async findAll(): Promise<Car[]> {
        try {
            const cars = await this.repository.findAll()
            return cars.map(car =>  this.urtRead.car(car))
        } catch (err) {
            throw new DatabaseException(err.message);
        }
    }
}
