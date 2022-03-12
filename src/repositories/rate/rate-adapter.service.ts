import {Injectable} from '@nestjs/common';
import {RateRepository} from "@rate/providers";
import { Rate } from '@rate/domain/rate';
import {RateRepositoryImplementation} from "./rate-repository-implementation";
import {RateAdapterMapperReadService} from "./rate-adapter-mapper-read.service";
import { DatabaseException } from '@common/exeptions';

/** адаптер работы с базой данных */
@Injectable()
export class RateAdapterService implements RateRepository {
    private readonly urtRead = new RateAdapterMapperReadService();

    constructor(private repository: RateRepositoryImplementation) {}

    async findRateById(id: string): Promise<Rate> {
        try {
            if (!id || !Number(id)) {
                throw new Error('Is not valid Id');
            }

            const rate = await this.repository.findRateById(Number(id))
            return this.urtRead.rate(rate);
        } catch (err) {
            throw new DatabaseException(err.message);
        }
    }
}
