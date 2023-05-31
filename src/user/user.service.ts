import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserGraphQL, UpdateUserGraphQL, User } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(input: CreateUserGraphQL): Promise<User> {
    const user = this.userRepository.create(input);
    return this.userRepository.save(user);
  }

  async update(id: number, input: UpdateUserGraphQL): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      const updatedUser = this.userRepository.merge(user, input);
      return this.userRepository.save(updatedUser);
    }
    return null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected > 0;
  }
}
