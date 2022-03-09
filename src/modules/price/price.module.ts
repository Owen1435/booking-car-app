import { Module } from '@nestjs/common';
import { PriceController } from './price.controller';
import { PriceService } from './service/price.service';
import { DbClientServiceModule } from 'src/common/db-client/db-client.service.module';
import { DiscountModule } from "../discount/discount.module";
import {RateModule} from "../rate/rate.module";

@Module({
  imports: [DbClientServiceModule, DiscountModule, RateModule],
  controllers: [PriceController],
  providers: [PriceService],
})
export class PriceModule {}
