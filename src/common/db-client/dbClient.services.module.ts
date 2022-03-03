import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbClientService } from './dbClient.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [DbClientService],
  exports: [DbClientService],
})
export class DbClientServicesModule {}
