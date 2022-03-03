import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/config/configuration';
import { DbClientServicesModule } from './common/db-client/dbClient.services.module';
import { BookingModule } from './modules/booking/booking.module';
import { CarModule } from './modules/cars/car.module';
import { PriceModule } from './modules/price/price.module';
import {AccountModule} from "./modules/account/account.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    DbClientServicesModule,
    BookingModule,
    CarModule,
    PriceModule,
    AccountModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
