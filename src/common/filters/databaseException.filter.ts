import { Catch } from '@nestjs/common';
import { DatabaseException } from '../exeptions';
import { BaseExceptionFilter } from './baseException.filter';

@Catch(DatabaseException)
export class DatabaseExceptionFilter extends BaseExceptionFilter<DatabaseException> {}
