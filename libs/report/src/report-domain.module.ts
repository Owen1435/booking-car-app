import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { COMMAND_HANDLERS, QUERY_HANDLERS, EVENT_HANDLERS, ReportFacade } from './application-services';
import {reportFacadeFactory, ReportRepository} from './providers';
import {CarRepository} from "@car/providers";

/** Провайдеры домена */
interface ReportModuleProviders {
    /** реализация репозитория */
    repository: new (...arr: unknown[]) => ReportRepository;
    carRepository: new (...arr: unknown[]) => CarRepository;
}

/** Домен клиента */
@Module({})
export class ReportDomainModule implements OnModuleInit {
    constructor(private queryBus: QueryBus, private commandBus: CommandBus, private eventBus: EventBus) {}

    static forRoot(providers: ReportModuleProviders): DynamicModule {
        return {
            module: ReportDomainModule,
            imports: [CqrsModule],
            providers: [
                /** подключаем репозиторий */
                {
                    provide: "ReportRepository",
                    useClass: providers.repository,
                },
                {
                    provide: "CarRepository",
                    useClass: providers.carRepository,
                },
                /** фасад бизнес правил */
                {
                    provide: ReportFacade,
                    useFactory: reportFacadeFactory,
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
                ReportFacade,
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
