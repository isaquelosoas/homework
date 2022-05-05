import { GenericException } from '../../exceptions/generic.exception';

export class UserNotFoundException extends GenericException {
  constructor() {
    super('User Not Found', 404, { message: 'User not found' });
  }
}
