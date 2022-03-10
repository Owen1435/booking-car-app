import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { COMMAND_HANDLERS, QUERY_HANDLERS, EVENT_HANDLERS, RateFacade } from './application-services';
import {rateFacadeFactory, RateRepository} from './providers';

/** Провайдеры домена */
interface DiscountModuleProviders {
    /** реализация репозитория */
    repository: new (...arr: unknown[]) => RateRepository;
}

/** Домен клиента */
@Module({})
export class RateDomainModule implements OnModuleInit {
    constructor(private queryBus: QueryBus, private commandBus: CommandBus, private eventBus: EventBus) {}

    static forRoot(providers: DiscountModuleProviders): DynamicModule {
        return {
            module: RateDomainModule,
            imports: [CqrsModule],
            providers: [
                /** подключаем репозиторий */
                {
                    provide: "RateRepository",
                    useClass: providers.repository,
                },
                /** фасад бизнес правил */
                {
                    provide: RateFacade,
                    useFactory: rateFacadeFactory,
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
                RateFacade,
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
