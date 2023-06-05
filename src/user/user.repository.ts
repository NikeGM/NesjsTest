import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserRoleDto, UserRole } from './user.interface';
import { User } from './entity/user.entity';

// UserService class to manage user related operations
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

  // Get all users from the database
  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      this.logger.error('Failed to find all users', error.stack);
      throw new InternalServerErrorException('Failed to find all users');
    }
  }

  // Find a user by their ID
  async findById(userId: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { userId } });
      if (!user) {
        throw new NotFoundException(`User with id: ${userId} not found`);
      }
      return user;
    } catch (error) {
      this.logger.error(`Failed to find user with id: ${userId}`, error.stack);
      throw new NotFoundException(`User with id: ${userId} not found`);
    }
  }

  // Find a user by their username
  async findByUsername(username: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { username } });
      if (!user) {
        throw new NotFoundException(`User with username: ${username} not found`);
      }
      return user;
    } catch (error) {
      this.logger.error(`Failed to find user with username: ${username}`, error.stack);
      throw new NotFoundException(`User with username: ${username} not found`);
    }
  }

  // Create a new user
  async create(passwordHash, userDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create({
        passwordHash,
        username: userDto.username,
        balance: 0,
        role: UserRole.USER
      });
      return await this.userRepository.save(user);
    } catch (error) {
      this.logger.error('Failed to create user', error.stack);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  // Update the role of a user
  async updateRole(userDto: UpdateUserRoleDto): Promise<User> {
    const { userId } = userDto;
    try {
      const user = await this.userRepository.findOne({ where: { userId } });
      if (!user) {
        throw new NotFoundException(`User with id: ${userId} not found`);
      }
      const updatedUser = this.userRepository.merge(user, userDto);
      return await this.userRepository.save(updatedUser);
    } catch (error) {
      this.logger.error(`Failed to update user role with id: ${userId}`, error.stack);
      throw new InternalServerErrorException(`Failed to update user role with id: ${userId}`);
    }
  }

  // Delete a user
  async delete(userId: number): Promise<boolean> {
    try {
      const result = await this.userRepository.delete(userId);
      if (!result.affected) {
        throw new NotFoundException(`User with id: ${userId} not found`);
      }
      return true;
    } catch (error) {
      this.logger.error(`Failed to delete user with id: ${userId}`, error.stack);
      throw new InternalServerErrorException(`Failed to delete user with id: ${userId}`);
    }
  }

  // Execute a transaction
  async executeInTransaction(execution: (manager: EntityManager) => Promise<any>): Promise<any> {
    try {
      return await this.entityManager.transaction(execution);
    } catch (error) {
      this.logger.error('Failed to execute transaction', error.stack);
      throw new InternalServerErrorException('Failed to execute transaction');
    }
  }
}
