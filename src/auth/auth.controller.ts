import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginData } from './auth.interface';
import { Logger } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  async login(@Body() userLoginData: UserLoginData) {
    try {
      const result = await this.authService.login(userLoginData);

      if (!result) {
        this.logger.warn(`Failed login attempt for username: ${userLoginData.username}`);
        return null;
      }

      return result;
    } catch (error) {
      this.logger.error('Error in login', error.stack);
      return null;
    }
  }
}
