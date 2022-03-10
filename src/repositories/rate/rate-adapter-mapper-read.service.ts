import {RateModel} from "./interfaces/rate.model";
import {RateDomain} from "@rate/domain/rate-domain";

/** Маппер работы с базой данных */
export class RateAdapterMapperReadService {

    public rate = (rate: RateModel): RateDomain =>
        !!rate
            ? {
                id: rate.id.toString(),
                distance: rate.distance ?? null,
                price: rate.price ?? null,
            }
            : null;
}
