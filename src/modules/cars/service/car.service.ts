import { Injectable, HttpStatus } from '@nestjs/common';
import { CarRepository } from '../repository/car.repository';
import { GetCarResponseDto } from '../dto/response/get-car-response.dto';
import {HttpException} from "@nestjs/common/exceptions/http.exception";

@Injectable()
export class CarService {
  constructor(private carRepository: CarRepository) {}

  async getCarById(carId: number): Promise<GetCarResponseDto> {
    const car = await this.carRepository.getCarById(carId);
    if (!car) {
      throw new HttpException(`Car was not found`, HttpStatus.NOT_FOUND);
    }
    return car;
  }

  async getAllCars(): Promise<GetCarResponseDto[]> {
    return this.carRepository.getAllCars();
  }
}
