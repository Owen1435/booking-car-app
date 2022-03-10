import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { COMMAND_HANDLERS, QUERY_HANDLERS, EVENT_HANDLERS, DiscountFacade } from './application-services';
import {discountFacadeFactory, DiscountRepository} from './providers';

/** Провайдеры домена */
interface DiscountModuleProviders {
    /** реализация репозитория */
    repository: new (...arr: unknown[]) => DiscountRepository;
}

/** Домен клиента */
@Module({})
export class DiscountDomainModule implements OnModuleInit {
    constructor(private queryBus: QueryBus, private commandBus: CommandBus, private eventBus: EventBus) {}

    static forRoot(providers: DiscountModuleProviders): DynamicModule {
        return {
            module: DiscountDomainModule,
            imports: [CqrsModule],
            providers: [
                /** подключаем репозиторий */
                {
                    provide: "DiscountRepository",
                    useClass: providers.repository,
                },
                /** фасад бизнес правил */
                {
                    provide: DiscountFacade,
                    useFactory: discountFacadeFactory,
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
                DiscountFacade,
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
