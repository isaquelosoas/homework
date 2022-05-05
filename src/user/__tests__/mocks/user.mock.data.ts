import { User } from '@prisma/client';
import { CreateUserDto } from '../../../user/dto/createUser.dto';

export class UserMockData {
  public static readonly userData: User = {
    id: '626a99c58acbf62c695dc774',
    email: 'isaquelosoas@hotmail.com',
    password: '12345678',
    name: 'Isaque Lopes',
    userBalance: 0,
    isAdmin: false,
    isApprover: false,
    approverId: null,
  };
  public static readonly createUserRequest: CreateUserDto = {
    email: 'isaquelosoas@hotmail.com',
    password: '12345678',
    firstName: 'Isaque',
    lastName: 'Lopes',
  };
}
