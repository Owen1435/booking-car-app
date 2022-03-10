import {Discount} from "../domain/discount";

/** Репозиторий домена */
export interface DiscountRepository {
    findOneByDays(days: number): Promise<Discount>;
}
