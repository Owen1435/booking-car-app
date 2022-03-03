import { Module } from '@nestjs/common';
import { PriceController } from './price.controller';
import { PriceService } from './service/price.service';
import { RateRepository } from './repository/rate.repository';
import { DiscountRepository } from './repository/discount.repository';
import { DbClientServicesModule } from 'src/common/db-client/dbClient.services.module';

@Module({
  imports: [DbClientServicesModule],
  controllers: [PriceController],
  providers: [PriceService, RateRepository, DiscountRepository],
})
export class PriceModule {}
