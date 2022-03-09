import { Module } from '@nestjs/common';
import { CarController } from 'src/modules/cars/car.controller';
import { CarService } from './service/car.service';
import { CarRepository } from './repository/car.repository';
import { DbClientServiceModule } from 'src/common/db-client/db-client.service.module';

@Module({
  imports: [DbClientServiceModule],
  controllers: [CarController],
  providers: [CarService, CarRepository],
})
export class CarModule {}
