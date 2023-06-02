import { Resolver, Query, Args, Mutation, Int, Context } from '@nestjs/graphql';
import { CreateUserDto, UpdateUserDto, UserGraphQL, UserRole } from './user.interface';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../role/role.guard';
import { Roles } from '../role/role.decorator';
import { UserAccessGraphQlGuard } from './user-access.guard';
import { UserService } from './user.service';
import { User } from './entity/user.entity';

@Resolver(of => UserGraphQL)
export class UserResolver {
  constructor(private readonly userService: UserService) {
  }

  @Query(returns => [UserGraphQL])
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(returns => UserGraphQL)
  @UseGuards(AuthGuard(), UserAccessGraphQlGuard)
  async user(@Args('userId', { type: () => Int }) userId: number): Promise<User> {
    return this.userService.findById(userId);
  }

  @Mutation(returns => UserGraphQL)
  async createUser(@Args('createUserInput') createUserInput: CreateUserDto): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Mutation(returns => UserGraphQL)
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserDto): Promise<User> {
    return this.userService.update(updateUserInput.userId, updateUserInput);
  }

  @Mutation(returns => Int)
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async deleteUser(@Args('userId', { type: () => Int }) userId: number): Promise<boolean> {
    return this.userService.delete(userId);
  }

  @Mutation(returns => Boolean)
  @UseGuards(AuthGuard())
  async buy(@Context('user') user: UserGraphQL, @Args('bookId') bookId: number): Promise<void> {
    return this.userService.buy(user.userId, bookId);
  }
}
