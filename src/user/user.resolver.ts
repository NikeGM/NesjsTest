import { Resolver, Query, Args, Mutation, Int, Context } from '@nestjs/graphql';
import { CreateUserDto, UpdateUserDto, UserGraphQL, UserRole } from './user.interface';
import { UseGuards, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch all users');
    }
  }

  @Query(returns => UserGraphQL)
  @UseGuards(AuthGuard(), UserAccessGraphQlGuard)
  async user(@Args('userId', { type: () => Int }) userId: number): Promise<User> {
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
  async createUser(@Args('createUserInput') createUserInput: CreateUserDto): Promise<User> {
    try {
      return await this.userService.create(createUserInput);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  @Mutation(returns => UserGraphQL)
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserDto): Promise<User> {
    try {
      return await this.userService.update(updateUserInput.userId, updateUserInput);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to update user with id: ${updateUserInput.userId}`);
    }
  }

  @Mutation(returns => Int)
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async deleteUser(@Args('userId', { type: () => Int }) userId: number): Promise<boolean> {
    try {
      return await this.userService.delete(userId);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to delete user with id: ${userId}`);
    }
  }

  @Mutation(returns => Boolean)
  @UseGuards(AuthGuard())
  async buy(@Context('user') user: UserGraphQL, @Args('bookId') bookId: number): Promise<boolean> {
    try {
      return await this.userService.buy(user.userId, bookId);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to buy book with id: ${bookId} for user with id: ${user.userId}`);
    }
  }
}
