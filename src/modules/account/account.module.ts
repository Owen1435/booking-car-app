import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './service/account.service';
import { AccountRepository } from './repository/account.repository';
import { DbClientServicesModule } from 'src/common/db-client/dbClient.services.module';

@Module({
  imports: [DbClientServicesModule],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
})
export class AccountModule {}
