import { DiscountModel } from './interfaces/discount.model';
import {DiscountDomain} from "../../../libs/discount/src/domain/discount-domain";

/** Маппер работы с базой данных */
export class DiscountAdapterMapperReadService {

    public discount = (discount: DiscountModel): DiscountDomain =>
        !!discount
            ? {
                id: discount.id.toString(),
                rate: discount.rate ?? null,
                fromDays: discount.fromDays ?? null,
                toDays: discount.toDays ?? null
            }
            : null;
}
