import {Price} from "./price";
import {Rate} from "@rate/domain/rate";
import {Discount} from "@discount/domain/discount";

export class PriceDomain implements Price {
    id: string = Date.now().toString();
    rate: Rate = null;
    discount: Discount = null;

    constructor(price: Price = null) {
        if (!!price) {
            Object.assign(this, price);
        }
    }
}