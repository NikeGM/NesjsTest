import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtPayload } from './auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'YOUR_SECRET_OR_KEY',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findById(payload.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
