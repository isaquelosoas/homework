import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime';
import { GenericException } from '../../exceptions/generic.exception';

class PrismaException extends GenericException {
  constructor(
    message: string,
    public data:
      | PrismaClientKnownRequestError
      | PrismaClientUnknownRequestError,
  ) {
    super(message, 404, data);
  }
}

export { PrismaException };
