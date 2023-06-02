import { Resolver, Query, Args, Mutation, Int, Context } from '@nestjs/graphql';
import { CreateUserDto, UpdateUserDto, UserGraphQL, User, UserRole } from './user.interface';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../role/role.guard';
import { Roles } from '../role/role.decorator';
import { UserAccessGraphQlGuard } from './user-access.guard';
import { UserService } from './user.service';

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
  async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Mutation(returns => UserGraphQL)
  async createUser(@Args('createUserInput') createUserInput: CreateUserDto): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Mutation(returns => UserGraphQL)
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserDto): Promise<User> {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(returns => Int)
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async deleteUser(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.userService.delete(id);
  }

  @Mutation(returns => Boolean)
  @UseGuards(AuthGuard())
  async buy(@Context('user') user: UserGraphQL, @Args('bookId') bookId: number): Promise<void> {
    return this.userService.buy(user.id, bookId);
  }
}
