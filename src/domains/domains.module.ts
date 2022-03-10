import { Global, Module } from '@nestjs/common';
import {CarDomainModule} from "@car/car-domain.module";
import {CarAdapterService} from "../repositories/car/car-adapter.service";

@Global()
@Module({
    imports: [CarDomainModule.forRoot({ repository: CarAdapterService })],
    exports: [CarDomainModule],
})
export class DomainsModule {}
