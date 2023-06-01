import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserLoginData, JwtPayload, LoginResult } from './auth.interface';
import { User } from '../user/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {
  }

  async validateUser(loginData: UserLoginData): Promise<User | null> {
    const user = await this.userService.findByNickname(loginData.nickname);
    if (user && await bcrypt.compare(loginData.password, user.passwordHash)) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<LoginResult> {
    const payload: JwtPayload = { id: user.id };
    return {
      accessToken: this.jwtService.sign(payload)
    };
  }
}