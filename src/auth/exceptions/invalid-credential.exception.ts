import { GenericException } from '../../exceptions/generic.exception';

export class InvalidCredentialException extends GenericException {
  constructor() {
    super('Invalid Credentials', 400, { message: 'Invalid Credentials' });
  }
}
