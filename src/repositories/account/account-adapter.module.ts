import { Module } from '@nestjs/common';
import { AccountAdapterService } from "./account-adapter.service";
import {AccountRepositoryImplementation} from "./account-repository-implementation";

/** Репозиторий */
@Module({
    providers: [AccountAdapterService, AccountRepositoryImplementation],
    exports: [AccountAdapterService, AccountRepositoryImplementation],
})
export class AccountAdapterModule {}
