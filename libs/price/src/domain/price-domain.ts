import {Price} from "./price";

export class PriceDomain implements Price {
    id: string = Date.now().toString();

    constructor(price: Price = null) {
        if (!!price) {
            Object.assign(this, price);
        }
    }
}