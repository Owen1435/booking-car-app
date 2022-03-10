import { Global, Module } from '@nestjs/common';
import { CarAdapterModule } from './car/car-adapter.module';
import { DbClientServiceModule } from "../common/db-client/db-client.service.module";
import { DiscountAdapterModule } from "./discount/discount-adapter.module";

/** Модули в репозитории */
const REPOSITORY_MODULES = [CarAdapterModule, DiscountAdapterModule];

/** репозитории приложения */
@Global()
@Module({
    imports: [...REPOSITORY_MODULES, DbClientServiceModule],
    exports: [...REPOSITORY_MODULES, DbClientServiceModule],
})
export class RepositoriesModule {}
