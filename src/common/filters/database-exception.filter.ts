import { Catch } from '@nestjs/common';
import { BaseExceptionFilter } from './base-exception.filter';
import {DatabaseException} from "@common/exeptions";

@Catch(DatabaseException)
export class DatabaseExceptionFilter extends BaseExceptionFilter<DatabaseException> {}
