import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './service/booking.service';
import { BookingRepository } from './repository/booking.repository';
import { DbClientServicesModule } from '../../common/db-client/dbClient.services.module';
import { ValidateBookService } from './service/validate-book.service';

@Module({
  imports: [DbClientServicesModule],
  controllers: [BookingController],
  providers: [BookingService, BookingRepository, ValidateBookService],
})
export class BookingModule {}
