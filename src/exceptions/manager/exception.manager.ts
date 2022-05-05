import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { GenericException } from '../generic.exception';

@Catch(Error)
export class ExceptionManager implements ExceptionFilter {
  catch(err: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (err instanceof GenericException) {
      const { message, status, data = {} } = err;
      return response.status(500).json({ status, message, data });
    }
    console.log(err);
    return response
      .status(500)
      .json({ status: 500, message: err.message, data: err });
  }
}
