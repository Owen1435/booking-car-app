import {Rate} from "../domain/rate";

/** Репозиторий домена */
export interface RateRepository {
    findRateById(id: number): Promise<Rate>;
}
