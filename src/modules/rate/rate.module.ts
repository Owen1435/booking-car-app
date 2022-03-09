import { Module } from '@nestjs/common';
import { DbClientServiceModule } from 'src/common/db-client/db-client.service.module';
import {RateRepository} from "./repository/rate.repository";

@Module({
  imports: [DbClientServiceModule],
  controllers: [],
  providers: [RateRepository],
  exports: [RateRepository]
})
export class RateModule {}
