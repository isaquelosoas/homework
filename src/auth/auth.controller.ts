import { Body, Controller, Headers, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(
    @Body() { email, password }: { email: string; password: string },
  ): Promise<any> {
    return this.authService.validateUser(email, password);
  }

  @Post('signup')
  async signup(@Body() body: CreateUserDto): Promise<any> {
    return this.authService.createUser(body);
  }

  @Post('verify')
  async verify(@Headers('authorization') token): Promise<any> {
    return this.authService.verifyUser(token);
  }
}
