import { Module } from '@nestjs/common';
import {RateAdapterService} from "./rate-adapter.service";
import {RateRepositoryImplementation} from "./rate-repository-implementation";

/** Репозиторий */
@Module({
    providers: [RateAdapterService, RateRepositoryImplementation],
    exports: [RateAdapterService, RateRepositoryImplementation],
})
export class RateAdapterModule {}
