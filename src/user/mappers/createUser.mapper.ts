import { Prisma } from '@prisma/client';
import { CreateUserDto } from '../dto/createUser.dto';

export function createUserData(data: CreateUserDto): Prisma.UserCreateInput {
  return {
    email: data.email,
    password: data.password,
    name: `${data.firstName} ${data.lastName}`,
  };
}

export function findUserData(
  data: Prisma.UserCreateInput,
): Prisma.UserFindManyArgs {
  let args: Prisma.UserFindManyArgs = { where: {} };

  Object.keys(data).forEach((key) => {
    args.where[key] = data[key];
  });
  return args;
}
