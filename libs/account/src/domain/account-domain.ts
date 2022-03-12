import {Account, CarLoadByDay} from "@account/domain/account";

export class AccountDomain implements Account {
    id: string = Date.now().toString();
    carId?: string = null
    carLoadByDay: CarLoadByDay[] = []

    constructor(account: Account = null) {
        if (!!account) {
            Object.assign(this, account);
        }
    }
}