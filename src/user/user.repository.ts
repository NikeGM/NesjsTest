import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto, User } from './user.interface';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id }});
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(userDto);
    return this.userRepository.save(user);
  }

  async update(id: number, userDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }});
    if (user) {
      const updatedUser = this.userRepository.merge(user, userDto);
      return this.userRepository.save(updatedUser);
    }
    return null;
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
