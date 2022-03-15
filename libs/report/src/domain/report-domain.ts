import {Report, DayLoad} from "@report/domain/report";

export class ReportDomain implements Report {
    carId?: number = null
    carLoadByDay: DayLoad[] = []

    //TODO: Fix
    constructor(account: Report = null) {
        if (!!account) {
            Object.assign(this, account);
        }
    }
}