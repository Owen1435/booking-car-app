import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './service/account.service';
import { AccountRepository } from './repository/account.repository';
import { DbClientServiceModule } from 'src/common/db-client/db-client.service.module';

@Module({
  imports: [DbClientServiceModule],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
})
export class AccountModule {}
