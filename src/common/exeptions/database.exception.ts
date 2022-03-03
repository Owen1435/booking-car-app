import { HttpStatus, InternalServerErrorException } from '@nestjs/common';

export class DatabaseException extends InternalServerErrorException {
  constructor() {
    super(HttpStatus.INTERNAL_SERVER_ERROR, 'Database error');
  }
}
