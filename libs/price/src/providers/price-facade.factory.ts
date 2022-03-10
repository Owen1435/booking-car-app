import { PriceFacade } from '../application-services';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

/** фабрика фасада */
export const priceFacadeFactory = (commandBus: CommandBus, queryBus: QueryBus, eventBus: EventBus) =>
    new PriceFacade(commandBus, queryBus, eventBus);
