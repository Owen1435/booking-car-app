import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../repository/account.repository';
import { DayOfWeek } from '../enum/day-of-week.enum';
import { CarAccountResponseDto } from "../dto/response/car-account-response.dto";

@Injectable()
export class AccountService {
  constructor( private accountRepository: AccountRepository ) {}

  async getAccountForCar(autoId: number): Promise<CarAccountResponseDto[]> {
    const accountForCar = await this.accountRepository.getAccountForCar(autoId);
    return accountForCar.map((account) => ({
      day: DayOfWeek[account.dayOfWeek],
      percent: account.percent,
    }));
  }

  async getAccountForAllCars(): Promise<CarAccountResponseDto[]> {
    const accountForAllCars = await this.accountRepository.getAccountForAllCars();
    return accountForAllCars.map((account) => ({
      day: DayOfWeek[account.dayOfWeek],
      percent: account.percent,
    }));
  }
}
