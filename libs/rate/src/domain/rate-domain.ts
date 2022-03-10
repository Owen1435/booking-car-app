import {Rate} from "./rate";

export class RateDomain implements Rate {
    id: string = Date.now().toString();
    distance: number = null;
    price: number = null;

    constructor(rate: Rate = null) {
        if (!!rate) {
            Object.assign(this, rate);
        }
    }
}