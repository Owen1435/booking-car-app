import { DiscountFacade } from '../application-services';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

/** фабрика фасада */
export const discountFacadeFactory = (commandBus: CommandBus, queryBus: QueryBus, eventBus: EventBus) =>
    new DiscountFacade(commandBus, queryBus, eventBus);
