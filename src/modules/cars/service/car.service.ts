import { Injectable } from '@nestjs/common';
import { CarRepository } from '../repository/car.repository';
import { GetCarResponseDto } from '../dto/response/get-car-response.dto';

@Injectable()
export class CarService {
  constructor(private carRepository: CarRepository) {}

  async getCarById(carId: number): Promise<GetCarResponseDto> {
    return await this.carRepository.getCarById(carId);
  }

  async getAllCars(): Promise<GetCarResponseDto[]> {
    return await this.carRepository.getAllCars();
  }
}
