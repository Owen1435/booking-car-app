import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

export class BaseExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    response.status(status).json({
      path: request.url,
      statusCode: status,
      message: exception.message,
      // @ts-ignore
      description: exception.getResponse()?.error
    });
  }
}
