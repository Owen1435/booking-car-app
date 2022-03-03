import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/config/configuration';
import { DbClientServicesModule } from './common/db-client/dbClient.services.module';
import { BookingModule } from './modules/booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    DbClientServicesModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
