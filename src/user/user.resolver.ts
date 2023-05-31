import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { CreateUserDto, UpdateUserDto, UserGraphQL, User } from './user.interface';
import { UserRepository } from './user.repository';

@Resolver(of => UserGraphQL)
export class UserResolver {
  constructor(private readonly userRepository: UserRepository) {
  }

  @Query(returns => [UserGraphQL])
  async users(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  @Query(returns => UserGraphQL)
  async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userRepository.findById(id);
  }

  @Mutation(returns => UserGraphQL)
  async createUser(@Args('createUserInput') createUserInput: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserInput);
  }

  @Mutation(returns => UserGraphQL)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserDto): Promise<User> {
    return this.userRepository.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(returns => Int)
  async deleteUser(@Args('id', { type: () => Int }) id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}
