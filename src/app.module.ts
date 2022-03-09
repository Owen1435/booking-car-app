import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/config/configuration';
import { DbClientServiceModule } from './common/db-client/db-client.service.module';
import { BookingModule } from './modules/booking/booking.module';
import { CarModule } from './modules/cars/car.module';
import { PriceModule } from './modules/price/price.module';
import {AccountModule} from "./modules/account/account.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    DbClientServiceModule,
    BookingModule,
    CarModule,
    PriceModule,
    AccountModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
