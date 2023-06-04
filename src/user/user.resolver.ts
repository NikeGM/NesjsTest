import { Resolver, Query, Args, Mutation, Int, Context } from '@nestjs/graphql';
import {
  CreateUserGraphQL,
  UpdateUserRoleGraphQL,
  UserGraphQL,
  UserRole
} from './user.interface';
import { UseGuards, NotFoundException, InternalServerErrorException, CanActivate } from '@nestjs/common';
import { RolesGuardGraphQL } from '../role/role.guard';
import { Roles } from '../role/role.decorator';
import { UserAccessGraphQlGuard } from './user-access.guard';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { AuthGuardGraphQL } from '../auth/auth.guard';

@Resolver(of => UserGraphQL)
export class UserResolver {
  constructor(private readonly userService: UserService) {
  }

  @Query(returns => [UserGraphQL])
  @UseGuards(AuthGuardGraphQL, RolesGuardGraphQL)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async getUsers(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch all users');
    }
  }

  @Query(returns => UserGraphQL)
  @UseGuards(AuthGuardGraphQL, UserAccessGraphQlGuard)
  async getUser(@Args('userId', { type: () => Int }) userId: number): Promise<User> {
    try {
      const user = await this.userService.findById(userId);
      if (!user) {
        throw new NotFoundException(`User with id: ${userId} not found`);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch user with id: ${userId}`);
    }
  }

  @Mutation(returns => UserGraphQL)
  async createUser(@Args('createUserInput') createUserInput: CreateUserGraphQL): Promise<User> {
    try {
      return await this.userService.create({
        username: createUserInput.username,
        password: createUserInput.password
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  @Mutation(returns => UserGraphQL)
  @UseGuards(AuthGuardGraphQL, RolesGuardGraphQL)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async updateUserRole(@Args('updateUserRoleInput') updateUserRoleInput: UpdateUserRoleGraphQL): Promise<User> {
    try {
      return await this.userService.updateRole({
        role: updateUserRoleInput.role,
        userId: updateUserRoleInput.userId
      });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to update user with id: ${updateUserRoleInput.userId}`);
    }
  }

  @Mutation(returns => Int)
  @UseGuards(AuthGuardGraphQL, RolesGuardGraphQL)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async deleteUser(@Args('userId', { type: () => Int }) userId: number): Promise<boolean> {
    try {
      return await this.userService.delete(userId);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to delete user with id: ${userId}`);
    }
  }

  @Mutation(returns => Boolean)
  @UseGuards(AuthGuardGraphQL)
  async buyBook(@Context() context, @Args('bookId') bookId: number): Promise<boolean> {
    const user = context.req.user;
    try {
      return await this.userService.buy(user.userId, bookId);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to buy book with id: ${bookId} for user with id: ${user.userId}`);
    }
  }
}
