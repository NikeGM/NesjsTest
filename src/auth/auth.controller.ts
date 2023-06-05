import { Controller, Post, Body, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginData } from './auth.interface';
import { Logger } from '@nestjs/common';

// AuthController is a controller that handles HTTP requests related to user authentication
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {
  }

  // login() method handles POST requests to /auth/login to authenticate a user and return a JWT
  @Post('login')
  async login(@Body() userLoginData: UserLoginData) {
    try {
      const result = await this.authService.login(userLoginData);

      if (!result) {
        this.logger.warn(`Failed login attempt for username: ${userLoginData.username}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      return result;
    } catch (error) {
      this.logger.error('Error in login', error.stack);
      throw new InternalServerErrorException();
    }
  }
}
