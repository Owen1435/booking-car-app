import { Module } from '@nestjs/common';
import {CarAdapterService} from "./car-adapter.service";
import {CarRepositoryImplementation} from "./car-repository-implementation";

/** Репозиторий */
@Module({
    providers: [CarAdapterService, CarRepositoryImplementation],
    exports: [CarAdapterService, CarRepositoryImplementation],
})
export class CarAdapterModule {}
