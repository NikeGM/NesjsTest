import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtPayload } from './auth.interface';
import { Logger } from '@nestjs/common';

// JwtStrategy validates JWT tokens
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private readonly userService: UserService) {
    super({
      // JWT extracts from the authorization header as a bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    });
  }

  // The validate method is a Passport strategy for handling JWT
  async validate(payload: JwtPayload) {
    try {
      const user = await this.userService.findById(payload.userId);

      if (!user) {
        this.logger.warn(`Invalid JWT payload, user with id ${payload.userId} not found.`);
        throw new UnauthorizedException('Invalid token');
      }

      return user;
    } catch (error) {
      this.logger.error('Error validating JWT', error.stack);
      throw error;
    }
  }
}
