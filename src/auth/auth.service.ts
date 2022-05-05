import { Injectable } from '@nestjs/common';
import { PasswordHelper } from '../helpers/password.helper';
import { UserManagementRepository } from '../user/repositories/userManagement.repository';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { InvalidCredentialException } from './exceptions/invalid-credential.exception';
import { JwtHelper } from '../helpers/jwt.helper';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userManagementRepository: UserManagementRepository,
    private readonly userService: UserService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const [hasUser] = await this.userManagementRepository.getUsers({
      where: { email },
    });
    if (!hasUser) {
      throw new UserNotFoundException();
    }

    const isPasswordValid = PasswordHelper.comparePassword(
      password,
      hasUser.password,
    );
    if (isPasswordValid) {
      delete hasUser.password;
      return { token: JwtHelper.generateToken(hasUser) };
    }

    throw new InvalidCredentialException();
  }

  async createUser(body: CreateUserDto): Promise<any> {
    const userData = await this.userService.createUser(body);
    delete userData.password;

    return { token: JwtHelper.generateToken(userData) };
  }
}
