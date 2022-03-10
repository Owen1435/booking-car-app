import { Module } from '@nestjs/common';
import {DiscountAdapterService} from "./discount-adapter.service";
import {DiscountRepositoryImplementation} from "./discount-repository-implementation";

/** Репозиторий */
@Module({
    providers: [DiscountAdapterService, DiscountRepositoryImplementation],
    exports: [DiscountAdapterService, DiscountRepositoryImplementation],
})
export class DiscountAdapterModule {}
