import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../user/user.interface';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
