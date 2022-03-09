import { Module } from '@nestjs/common';
import { DbClientServiceModule } from 'src/common/db-client/db-client.service.module';
import {DiscountRepository} from "./repository/discount.repository";

@Module({
  imports: [DbClientServiceModule],
  controllers: [],
  providers: [DiscountRepository],
  exports: [DiscountRepository]
})
export class DiscountModule {}
