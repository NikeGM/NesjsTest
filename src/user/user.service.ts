import { BadRequestException, NotFoundException, Injectable, Inject, LoggerService } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { UserLoginData } from '../auth/auth.interface';
import { BookService } from '../book/book.service';
import { User } from './entity/user.entity';
import { Book } from '../book/entity/book.entity';
import { UserBook } from './entity/user-book.entity';
import { Transaction, TransactionAction } from './entity/transaction.entity';
import { UserRepository } from './user.repository';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CreateUserDto, UpdateUserRoleDto } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(UserBook)
    private userBookRepository: Repository<UserBook>,
    @InjectRepository(Book)
    private bookService: BookService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: LoggerService
  ) {
  }

  async buy(userId: number, bookId: number): Promise<boolean> {
    try {
      const user = await this.findById(userId);
      const book = await this.bookService.findById(bookId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (!book) {
        throw new NotFoundException('Book not found');
      }

      if (user.balance < book.price) {
        throw new BadRequestException('Insufficient balance');
      }

      await this.userRepository.executeInTransaction(async (manager) => {
        user.balance -= book.price;
        await manager.save(user);

        const transaction = this.transactionRepository.create({
          user,
          bookId: book.bookId,
          action: TransactionAction.BUY,
          amount: book.price,
          createdAt: new Date()
        });
        await manager.save(transaction);

        const userBook = this.userBookRepository.create({
          userId: user.userId,
          bookId: book.bookId,
          createdAt: new Date()
        });
        await manager.save(userBook);
      });
      return true;
    } catch (error) {
      this.logger.error(`Failed to execute buy method: ${error.message}`);
      throw new BadRequestException('Failed to execute buy method');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.findAll();
      if (!users) {
        throw new NotFoundException('Users not found');
      }
      return users;
    } catch (error) {
      this.logger.error(`Failed to execute findAll method: ${error.message}`);
      throw new BadRequestException('Failed to execute findAll method');
    }
  }

  async findById(userId: number): Promise<User> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      this.logger.error(`Failed to execute findById method: ${error.message}`);
      throw new BadRequestException('Failed to execute findById method');
    }
  }

  async findByUsername(username: string): Promise<User> {
    try {
      const user = await this.userRepository.findUsername(username);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      this.logger.error(`Failed to execute findByUsername method: ${error.message}`);
      throw new BadRequestException('Failed to execute findByUsername method');
    }
  }

  async create(input: CreateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.create(input);
      if (!user) {
        throw new BadRequestException('Failed to create user');
      }
      return user;
    } catch (error) {
      this.logger.error(`Failed to execute create method: ${error.message}`);
      throw new BadRequestException('Failed to execute create method');
    }
  }

  async updateRole(input: UpdateUserRoleDto): Promise<User> {
    try {
      const user = await this.userRepository.updateRole(input);
      if (!user) {
        throw new BadRequestException('Failed to update user');
      }
      return user;
    } catch (error) {
      this.logger.error(`Failed to execute update method: ${error.message}`);
      throw new BadRequestException('Failed to execute update method');
    }
  }

  async delete(userId: number): Promise<boolean> {
    try {
      const result = await this.userRepository.delete(userId);
      if (!result) {
        throw new BadRequestException('Failed to delete user');
      }
      return true;
    } catch (error) {
      this.logger.error(`Failed to execute delete method: ${error.message}`);
      throw new BadRequestException('Failed to execute delete method');
    }
  }

  async validateUser(userLoginData: UserLoginData): Promise<User> {
    try {
      const { username, passwordHash } = userLoginData;

      const user = await this.findByUsername(username);

      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }

      const isPasswordMatching = await bcrypt.compare(passwordHash, user.passwordHash);

      if (!isPasswordMatching) {
        throw new BadRequestException('Invalid credentials');
      }

      return user;
    } catch (error) {
      this.logger.error(`Failed to validate user: ${error.message}`);
      throw new BadRequestException('Failed to validate user');
    }
  }
}
