import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

// Guard using Passport.js JWT strategy for authentication
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Handles Passport.js authentication results
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid token');
    }
    return user;
  }
}

// Guard using Passport.js JWT strategy for GraphQL context
@Injectable()
export class AuthGuardGraphQL extends AuthGuard('jwt') {
  // Customizes request retrieval for GraphQL context
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }

  // Handles Passport.js authentication results
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
