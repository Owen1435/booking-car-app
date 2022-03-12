import { Global, Module } from '@nestjs/common';
import {CarDomainModule} from "@car/car-domain.module";
import {DiscountDomainModule} from "@discount/discount-domain.module";
import {RateDomainModule} from "@rate/rate-domain.module";
import {CarAdapterService} from "../repositories/car/car-adapter.service";
import {DiscountAdapterService} from "../repositories/discount/discount-adapter.service";
import {RateAdapterService} from "../repositories/rate/rate-adapter.service";
import {PriceDomainModule} from "@price/price-domain.module";
import {BookingCarDomainModule} from "@booking-car/booking-car-domain.module";
import {BookingCarAdapterService} from "../repositories/booking-car/booking-car-adapter.service";
import {AccountDomainModule} from "@account/account-domain.module";
import {AccountAdapterService} from "../repositories/account/account-adapter.service";

@Global()
@Module({
    imports: [
        CarDomainModule.forRoot({
            repository: CarAdapterService
        }),
        DiscountDomainModule.forRoot({
            repository: DiscountAdapterService
        }),
        RateDomainModule.forRoot({
            repository: RateAdapterService
        }),
        PriceDomainModule.forRoot({
            rateRepository: RateAdapterService,
            discountRepository: DiscountAdapterService
        }),
        BookingCarDomainModule.forRoot({
            repository: BookingCarAdapterService,
            rateRepository: RateAdapterService,
            carRepository: CarAdapterService
        }),
        AccountDomainModule.forRoot({
            repository: AccountAdapterService,
        }),
    ],

    exports: [
        CarDomainModule,
        DiscountDomainModule,
        RateDomainModule,
        PriceDomainModule,
        BookingCarDomainModule,
        AccountDomainModule
    ],
})
export class DomainsModule {}
