import { Module } from '@nestjs/common';
import {BookingCarAdapterService} from "./booking-car-adapter.service";
import {BookingCarRepositoryImplementation} from "./booking-car-repository-implementation";

/** Репозиторий */
@Module({
    providers: [BookingCarAdapterService, BookingCarRepositoryImplementation],
    exports: [BookingCarAdapterService, BookingCarRepositoryImplementation],
})
export class BookingCarAdapterModule {}
