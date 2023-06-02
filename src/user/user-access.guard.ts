import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRole } from './user.interface';
import { GqlExecutionContext } from '@nestjs/graphql';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class UserAccessGuard implements CanActivate {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      const params = request.params;

      const isManager = user.role === UserRole.MANAGER || user.role == UserRole.ADMIN;

      if (!isManager && user.userId !== params.userId) {
        this.logger.warn(`Access denied for user ${user.userId}`);
        return false;
      }

      return true;
    } catch (error) {
      this.logger.error(`UserAccessGuard failed with error: ${error.message}`);
      return false;
    }
  }
}

@Injectable()
export class UserAccessGraphQlGuard implements CanActivate {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const ctx = GqlExecutionContext.create(context);
      const user = ctx.getContext().req.user;
      const params = ctx.getArgs();

      if (user.role !== UserRole.MANAGER && user.userId !== params.userId) {
        this.logger.warn(`Access denied for user ${user.userId}`);
        return false;
      }

      return true;
    } catch (error) {
      this.logger.error(`UserAccessGraphQlGuard failed with error: ${error.message}`);
      return false;
    }
  }
}
