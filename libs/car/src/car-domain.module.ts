import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import {
  COMMAND_HANDLERS,
  QUERY_HANDLERS,
  EVENT_HANDLERS,
  CarFacade,
} from './application-services';
import { carFacadeFactory, CarRepository } from './providers';

/** Провайдеры домена */
interface CarModuleProviders {
  /** реализация репозитория */
  repository: new (...arr: unknown[]) => CarRepository;
}

/** Домен клиента */
@Module({})
export class CarDomainModule implements OnModuleInit {
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus,
    private eventBus: EventBus,
  ) {}
  static forRoot(providers: CarModuleProviders): DynamicModule {
    return {
      module: CarDomainModule,
      imports: [CqrsModule],
      providers: [
        /** подключаем репозиторий */
        {
          provide: 'CarRepository',
          useClass: providers.repository,
        },
        /** фасад бизнес правил */
        {
          provide: CarFacade,
          useFactory: carFacadeFactory,
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
        CarFacade,
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
