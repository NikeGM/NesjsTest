import { Controller, Post, Body, Req, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginData, LoginResult } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: UserLoginData, @Req() req): Promise<LoginResult> {
    const user = await this.authService.validateUser(loginUserDto);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return this.authService.login(user);
  }
}
