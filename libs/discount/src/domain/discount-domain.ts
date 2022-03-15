import {Discount} from "./discount";

export class DiscountDomain implements Discount {
    id: number = Date.now();
    rate: number = null;
    fromDays: number = null;
    toDays: number = null;

    constructor(discount: Discount = null) {
        if (!!discount) {
            Object.assign(this, discount);
        }
    }
}