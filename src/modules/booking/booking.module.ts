import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './service/booking.service';
import { BookingRepository } from './repository/booking.repository';
import { DbClientServiceModule } from '../../common/db-client/db-client.service.module';

@Module({
  imports: [DbClientServiceModule],
  controllers: [BookingController],
  providers: [BookingService, BookingRepository],
})
export class BookingModule {}
