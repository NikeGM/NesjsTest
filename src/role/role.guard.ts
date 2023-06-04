import { Injectable, CanActivate, ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    try {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if (!roles) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      const hasRole = roles.includes(user.role);

      if (!hasRole) {
        this.logger.warn(`User with role ${user.role} does not have access`);
        throw new UnauthorizedException(`User with role ${user.role} does not have access`);
      }

      return hasRole;
    } catch (error) {
      this.logger.error('Error during authorization', error.stack);
      throw new UnauthorizedException('Error during authorization');
    }
  }
}

@Injectable()
export class RolesGuardGraphQL implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    try {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if (!roles) {
        return true;
      }
      const ctx = GqlExecutionContext.create(context);
      const user = ctx.getContext().req.user;
      const hasRole = roles.includes(user.role);

      if (!hasRole) {
        this.logger.warn(`User with role ${user.role} does not have access`);
        throw new UnauthorizedException(`User with role ${user.role} does not have access`);
      }

      return hasRole;
    } catch (error) {
      this.logger.error('Error during authorization', error.stack);
      throw new UnauthorizedException('Error during authorization');
    }
  }
}
