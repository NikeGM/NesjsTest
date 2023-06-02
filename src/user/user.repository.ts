import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.interface';
import { User } from './entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(userId: number): Promise<User> {
    return this.userRepository.findOne({ where: { userId } });
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(userDto);
    return this.userRepository.save(user);
  }

  async update(userId: number, userDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (user) {
      const updatedUser = this.userRepository.merge(user, userDto);
      return this.userRepository.save(updatedUser);
    }
    return null;
  }

  async delete(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }
}
