import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

/** класс-фасад */
@Injectable()
export class RateFacade {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus, private eventBus: EventBus) {}

}
