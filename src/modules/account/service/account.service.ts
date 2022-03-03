import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../repository/account.repository';
import { DayOfWeek } from '../enum/dayOfWeek.enum';
import { AccountForEachCarResponseDto } from '../dto/response/account-for-each-car-response.dto';
import { AccountForAllCarsResponseDto } from "../dto/response/account-for-all-cars-response.dto";

@Injectable()
export class AccountService {
  constructor( private accountRepository: AccountRepository ) {}

  async getAccountForCar(autoId: number): Promise<AccountForEachCarResponseDto[]> {
    const accountForCar = await this.accountRepository.getAccountForCar(autoId);
    return accountForCar.map((account) => ({
      day: DayOfWeek[account.day_of_week],
      percent: account.percent,
    }));
  }

  async getAccountForAllCars(): Promise<AccountForAllCarsResponseDto[]> {
    const accountForAllCars = await this.accountRepository.getAccountForAllCars();
    return accountForAllCars.map((account) => ({
      day: DayOfWeek[account.day_of_week],
      percent: account.percent,
    }));
  }
}
