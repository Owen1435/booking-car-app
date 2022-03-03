import { Client } from 'pg';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DbClientService {
  client: Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new Client({
      user: this.configService.get<string>('database.user'),
      database: this.configService.get<string>('database.name'),
      password: this.configService.get<string>('database.password'),
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
    });

    this.client.connect().then(undefined);
  }

  public getClient(): Client {
    return this.client;
  }
}
