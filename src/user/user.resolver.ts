import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { CreateUserDto, UpdateUserDto, UserGraphQL, User } from './user.interface';
import { UserRepository } from './user.repository';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Resolver(of => UserGraphQL)
export class UserResolver {
  constructor(private readonly userRepository: UserRepository) {
  }

  @Query(returns => [UserGraphQL])
  @UseGuards(AuthGuard)
  async users(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  @Query(returns => UserGraphQL)
  @UseGuards(AuthGuard)
  async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userRepository.findById(id);
  }

  @Mutation(returns => UserGraphQL)
  @UseGuards(AuthGuard)
  async createUser(@Args('createUserInput') createUserInput: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserInput);
  }

  @Mutation(returns => UserGraphQL)
  @UseGuards(AuthGuard)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserDto): Promise<User> {
    return this.userRepository.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(returns => Int)
  @UseGuards(AuthGuard)
  async deleteUser(@Args('id', { type: () => Int }) id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}
