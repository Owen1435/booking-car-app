import { Module } from '@nestjs/common';
import { ReportAdapterService } from "./report-adapter.service";
import {ReportRepositoryImplementation} from "./report-repository-implementation";

/** Репозиторий */
@Module({
    providers: [ReportAdapterService, ReportRepositoryImplementation],
    exports: [ReportAdapterService, ReportRepositoryImplementation],
})
export class ReportAdapterModule {}
