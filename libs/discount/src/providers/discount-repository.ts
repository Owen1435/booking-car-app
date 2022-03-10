import {Discount} from "../domain/discount";

/** Репозиторий домена */
export interface DiscountRepository {
    findDiscountByDays(days: number): Promise<Discount>;
}
