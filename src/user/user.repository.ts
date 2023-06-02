import { Injectable, Logger } from '@nestjs/common';
import { Repository, EntityManager } from 'typeorm';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from './user.interface';
import { User } from './entity/user.entity';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectEntityManager()
    private entityManager: EntityManager
  ) {
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      this.logger.error('Failed to find all users', error.stack);
      return [];
    }
  }

  async findById(userId: number): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { userId } });
    } catch (error) {
      this.logger.error(`Failed to find user with id: ${userId}`, error.stack);
      return null;
    }
  }

  async findUsername(username: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { username } });
    } catch (error) {
      this.logger.error(`Failed to find user with username: ${username}`, error.stack);
      return null;
    }
  }

  async create(userDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(userDto);
      return await this.userRepository.save(user);
    } catch (error) {
      this.logger.error('Failed to create user', error.stack);
      return null;
    }
  }

  async update(userId: number, userDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { userId } });
      if (user) {
        const updatedUser = this.userRepository.merge(user, userDto);
        return await this.userRepository.save(updatedUser);
      }
      return null;
    } catch (error) {
      this.logger.error(`Failed to update user with id: ${userId}`, error.stack);
      return null;
    }
  }

  async delete(userId: number): Promise<void> {
    try {
      await this.userRepository.delete(userId);
    } catch (error) {
      this.logger.error(`Failed to delete user with id: ${userId}`, error.stack);
    }
  }

  async executeInTransaction(execution: (manager: EntityManager) => Promise<any>): Promise<any> {
    try {
      return await this.entityManager.transaction(execution);
    } catch (error) {
      this.logger.error('Failed to execute transaction', error.stack);
      return null;
    }
  }
}
