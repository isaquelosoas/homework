import { HttpException } from '@nestjs/common';

export abstract class GenericException extends Error {
  constructor(message: string, public status: number, public data?: object) {
    super(message);

    Object.setPrototypeOf(this, GenericException.prototype);
  }
}
