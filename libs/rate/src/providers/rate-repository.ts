import {Rate} from "../domain/rate";

/** Репозиторий домена */
export interface RateRepository {
    findRateById(id: string): Promise<Rate>;
}
