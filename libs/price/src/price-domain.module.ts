import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { COMMAND_HANDLERS, QUERY_HANDLERS, EVENT_HANDLERS, PriceFacade } from './application-services';
import {priceFacadeFactory, PriceRepository} from './providers';
import {DiscountDomainModule} from "@discount/discount-domain.module";
import {RateDomainModule} from "@rate/rate-domain.module";

/** Провайдеры домена */
interface DiscountModuleProviders {
    /** реализация репозитория */
    repository?: new (...arr: unknown[]) => PriceRepository;
}

/** Домен клиента */
@Module({})
export class PriceDomainModule implements OnModuleInit {
    constructor(private queryBus: QueryBus, private commandBus: CommandBus, private eventBus: EventBus) {}

    static forRoot(providers: DiscountModuleProviders): DynamicModule {
        return {
            module: PriceDomainModule,
            imports: [CqrsModule, DiscountDomainModule, RateDomainModule],
            providers: [
                /** подключаем репозиторий */
                {
                    provide: "PriceRepository",
                    useClass: providers.repository,
                },
                /** фасад бизнес правил */
                {
                    provide: PriceFacade,
                    useFactory: priceFacadeFactory,
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
                PriceFacade,
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
