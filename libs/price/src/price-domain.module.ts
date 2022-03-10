import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { COMMAND_HANDLERS, QUERY_HANDLERS, EVENT_HANDLERS, PriceFacade } from './application-services';
import {priceFacadeFactory, PriceRepository} from './providers';
import {RateRepository} from "@rate/providers";
import {DiscountRepository} from "@discount/providers";

/** Провайдеры домена */
interface PriceModuleProviders {
    /** реализация репозитория */
    repository?: new (...arr: unknown[]) => PriceRepository;
    rateRepository: new (...arr: unknown[]) => RateRepository;
    discountRepository: new (...arr: unknown[]) => DiscountRepository;
}

/** Домен клиента */
@Module({})
export class PriceDomainModule implements OnModuleInit {
    constructor(private queryBus: QueryBus, private commandBus: CommandBus, private eventBus: EventBus) {}

    static forRoot(providers: PriceModuleProviders): DynamicModule {
        return {
            module: PriceDomainModule,
            imports: [CqrsModule],
            providers: [
                /** подключаем репозиторий */
                {
                    provide: "PriceRepository",
                    useClass: providers.repository,
                },
                {
                    provide: "RateRepository",
                    useClass: providers.rateRepository,
                },
                {
                    provide: "DiscountRepository",
                    useClass: providers.discountRepository,
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
