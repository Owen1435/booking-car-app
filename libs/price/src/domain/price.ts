import {Rate} from "@rate/domain/rate";
import {Discount} from "@discount/domain/discount";

export interface Price {
    id: string;
    rate: Rate;
    discount: Discount;
}