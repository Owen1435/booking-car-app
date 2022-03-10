import { Global, Module } from '@nestjs/common';
import {CarDomainModule} from "@car/car-domain.module";
import {DiscountDomainModule} from "@discount/discount-domain.module";
import {RateDomainModule} from "@rate/rate-domain.module";
import {CarAdapterService} from "../repositories/car/car-adapter.service";
import {DiscountAdapterService} from "../repositories/discount/discount-adapter.service";
import {RateAdapterService} from "../repositories/rate/rate-adapter.service";

@Global()
@Module({
    imports: [
        CarDomainModule.forRoot({ repository: CarAdapterService }),
        DiscountDomainModule.forRoot({ repository: DiscountAdapterService }),
        RateDomainModule.forRoot({ repository: RateAdapterService }),
    ],
    exports: [
        CarDomainModule,
        DiscountDomainModule,
    ],
})
export class DomainsModule {}