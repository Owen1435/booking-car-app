import { CarFacade } from '../application-services';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

/** фабрика фасада */
export const carFacadeFactory = (commandBus: CommandBus, queryBus: QueryBus, eventBus: EventBus) =>
    new CarFacade(commandBus, queryBus, eventBus);
