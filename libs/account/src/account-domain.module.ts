import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { COMMAND_HANDLERS, QUERY_HANDLERS, EVENT_HANDLERS, AccountFacade } from './application-services';
import {accountFacadeFactory, AccountRepository} from './providers';
import {CarRepository} from "@car/providers";

/** Провайдеры домена */
interface AccountModuleProviders {
    /** реализация репозитория */
    repository: new (...arr: unknown[]) => AccountRepository;
    carRepository: new (...arr: unknown[]) => CarRepository;
}

/** Домен клиента */
@Module({})
export class AccountDomainModule implements OnModuleInit {
    constructor(private queryBus: QueryBus, private commandBus: CommandBus, private eventBus: EventBus) {}

    static forRoot(providers: AccountModuleProviders): DynamicModule {
        return {
            module: AccountDomainModule,
            imports: [CqrsModule],
            providers: [
                /** подключаем репозиторий */
                {
                    provide: "AccountRepository",
                    useClass: providers.repository,
                },
                {
                    provide: "CarRepository",
                    useClass: providers.carRepository,
                },
                /** фасад бизнес правил */
                {
                    provide: AccountFacade,
                    useFactory: accountFacadeFactory,
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
                AccountFacade,
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
