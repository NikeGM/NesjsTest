import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRole } from './user.interface';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class UserAccessGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const params = request.params;

    const isManager = user.role === UserRole.MANAGER || user.role == UserRole.ADMIN;

    return isManager || user.id === params.id;
  }
}

@Injectable()
export class UserAccessGraphQlGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    const params = ctx.getArgs();

    return user.role === UserRole.MANAGER || user.id === params.id;
  }
}
