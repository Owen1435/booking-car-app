import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/config/configuration';
import { BookingModule } from './modules/booking/booking.module';
import { CarModule } from './modules/cars/car.module';
import { PriceModule } from './modules/price/price.module';
import {AccountModule} from "./modules/account/account.module";
import {DomainsModule} from "./domains/domains.module";
import {RepositoriesModule} from "./repositories/repositories.module";
import {ControllersModule} from "./controllers/controllers.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    BookingModule,
    CarModule,
    PriceModule,
    AccountModule,

    ControllersModule,
    RepositoriesModule,
    DomainsModule
  ]
})
export class AppModule {}
