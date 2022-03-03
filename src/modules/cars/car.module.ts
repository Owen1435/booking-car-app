import { Module } from '@nestjs/common';
import { CarController } from 'src/modules/cars/car.controller';
import { CarService } from './service/car.service';
import { CarRepository } from './repository/car.repository';
import { DbClientServicesModule } from 'src/common/db-client/dbClient.services.module';

@Module({
  imports: [DbClientServicesModule],
  controllers: [CarController],
  providers: [CarService, CarRepository],
})
export class CarModule {}
