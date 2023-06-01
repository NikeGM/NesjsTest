import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, UserLoginData } from './auth.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userLoginData: UserLoginData) {
    const user = await this.usersService.validateUser(userLoginData);
    if (!user) {
      return null;
    }

    const payload: JwtPayload = { id: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      expiresIn: 3600,
      accessToken,
    };
  }
}
