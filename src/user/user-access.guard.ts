import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  ForbiddenException,
  UnauthorizedException
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRole } from './user.interface';
import { GqlExecutionContext } from '@nestjs/graphql';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

// Guard for HTTP API
@Injectable()
export class UserAccessGuard implements CanActivate {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {
  }

  // Checks user permissions
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const params = request.params;

    if (!user) {
      this.logger.warn(`Unauthorized access attempt`);
      throw new UnauthorizedException();
    }

    const isManager = user.role === UserRole.MANAGER || user.role == UserRole.ADMIN;

    if (!isManager && user.userId !== params.userId) {
      this.logger.warn(`Access denied for user ${user.userId}`);
      throw new ForbiddenException();
    }

    return true;
  }
}

// Guard for GraphQL API
@Injectable()
export class UserAccessGraphQlGuard implements CanActivate {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {
  }

  // Checks user permissions for GraphQL API
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    const params = ctx.getArgs();

    if (!user) {
      this.logger.warn(`Unauthorized access attempt`);
      throw new UnauthorizedException();
    }

    if (user.role !== UserRole.MANAGER && user.userId !== params.userId) {
      this.logger.warn(`Access denied for user ${user.userId}`);
      throw new ForbiddenException();
    }

    return true;
  }
}
