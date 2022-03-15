import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import {
  COMMAND_HANDLERS,
  QUERY_HANDLERS,
  EVENT_HANDLERS,
  BookingCarFacade,
} from './application-services';
import { bookingCarFacadeFactory, BookingCarRepository } from './providers';
import { RateRepository } from '@rate/providers';
import { CarRepository } from '@car/providers';

/** Провайдеры домена */
interface BookingCarModuleProviders {
  /** реализация репозитория */
  repository: new (...arr: unknown[]) => BookingCarRepository;
  rateRepository: new (...arr: unknown[]) => RateRepository;
  carRepository: new (...arr: unknown[]) => CarRepository;
}

/** Домен клиента */
@Module({})
export class BookingCarDomainModule implements OnModuleInit {
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus,
    private eventBus: EventBus,
  ) {}

  static forRoot(providers: BookingCarModuleProviders): DynamicModule {
    return {
      module: BookingCarDomainModule,
      imports: [CqrsModule],
      providers: [
        /** подключаем репозиторий */
        {
          provide: 'BookingCarRepository',
          useClass: providers.repository,
        },
        {
          provide: 'RateRepository',
          useClass: providers.rateRepository,
        },
        {
          provide: 'CarRepository',
          useClass: providers.carRepository,
        },
        /** фасад бизнес правил */
        {
          provide: BookingCarFacade,
          useFactory: bookingCarFacadeFactory,
          inject: [CommandBus, QueryBus, EventBus],
        },
        /** подключаем CQRS */
        CommandBus,
        ...COMMAND_HANDLERS,
        QueryBus,
        ...QUERY_HANDLERS,
        EventBus,
        ...EVENT_HANDLERS,
      ],
      exports: [
        /** публикуем фасад */
        BookingCarFacade,
      ],
    };
  }

  /** Регистрация обработчиков */
  onModuleInit(): void {
    this.commandBus.register(COMMAND_HANDLERS);
    this.queryBus.register(QUERY_HANDLERS);
    this.eventBus.register(EVENT_HANDLERS);
  }
}
