import { BookingCarFacade } from '../application-services';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

/** фабрика фасада */
export const bookingCarFacadeFactory = (commandBus: CommandBus, queryBus: QueryBus, eventBus: EventBus) =>
    new BookingCarFacade(commandBus, queryBus, eventBus);
