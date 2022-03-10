import { Global, Module } from '@nestjs/common';
import {CarDomainModule} from "@car/car-domain.module";
import {CarAdapterService} from "../repositories/car/car-adapter.service";
import {DiscountDomainModule} from "../../libs/discount/src/discount-domain.module";
import {DiscountAdapterService} from "../repositories/discount/discount-adapter.service";

@Global()
@Module({
    imports: [
        CarDomainModule.forRoot({ repository: CarAdapterService }),
        DiscountDomainModule.forRoot({ repository: DiscountAdapterService }),
    ],
    exports: [
        CarDomainModule,
        DiscountDomainModule,
    ],
})
export class DomainsModule {}
