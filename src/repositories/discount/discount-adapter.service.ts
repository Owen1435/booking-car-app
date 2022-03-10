import {Injectable} from '@nestjs/common';
import {DatabaseException} from "../../common/exeptions";
import { DiscountRepository } from 'libs/discount/src/providers';
import {Discount} from "@discount/domain/discount";
import {DiscountAdapterMapperReadService} from "./discount-adapter-mapper-read.service";
import {DiscountRepositoryImplementation} from "./discount-repository-implementation";

/** адаптер работы с базой данных */
@Injectable()
export class DiscountAdapterService implements DiscountRepository {
    private readonly urtRead = new DiscountAdapterMapperReadService();
    // private readonly urtWrite = new CarAdapterMapperWriteService();

    constructor(private repository: DiscountRepositoryImplementation) {}

    async findDiscountByDays(days: number): Promise<Discount> {
        try {
            if (!days) {
                throw new Error('Is not valid days');
            }

            const discount = await this.repository.findDiscountByDays(days)
            return this.urtRead.discount(discount);
        } catch (err) {
            throw new DatabaseException(err.message);
        }
    }
}
