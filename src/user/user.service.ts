import { Injectable, Inject, LoggerService } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from './user.interface';
import bcrypt from 'bcrypt';
import { UserLoginData } from '../auth/auth.interface';
import { BookService } from '../book/book.service';
import { User } from './entity/user.entity';
import { Book } from '../book/entity/book.entity';
import { UserBook } from './entity/user-book.entity';
import { Transaction, TransactionAction } from './entity/transaction.entity';
import { UserRepository } from './user.repository';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

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

      if (!user || !book) {
        this.logger.error('User or book not found');
        return false;
      }

      if (user.balance < book.price) {
        this.logger.error('Insufficient balance');
        return false;
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
        return true;
      });
    } catch (error) {
      this.logger.error(`Failed to execute buy method: ${error.message}`);
      return false;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      this.logger.error(`Failed to execute findAll method: ${error.message}`);
      return [];
    }
  }

  async findById(userId: number): Promise<User> {
    try {
      return await this.userRepository.findById(userId);
    } catch (error) {
      this.logger.error(`Failed to execute findById method: ${error.message}`);
      return null;
    }
  }

  async findByUsername(username: string): Promise<User> {
    try {
      return await this.userRepository.findUsername(username);
    } catch (error) {
      this.logger.error(`Failed to execute findByUsername method: ${error.message}`);
      return null;
    }
  }

  async create(input: CreateUserDto): Promise<User> {
    try {
      return await this.userRepository.create(input);
    } catch (error) {
      this.logger.error(`Failed to execute create method: ${error.message}`);
      return null;
    }
  }

  async update(userId: number, input: UpdateUserDto): Promise<User> {
    try {
      return await this.userRepository.update(userId, input);
    } catch (error) {
      this.logger.error(`Failed to execute update method: ${error.message}`);
      return null;
    }
  }

  async delete(userId: number): Promise<boolean> {
    try {
      await this.userRepository.delete(userId);
      return true;
    } catch (error) {
      this.logger.error(`Failed to execute delete method: ${error.message}`);
      return false;
    }
  }

  async validateUser(userLoginData: UserLoginData): Promise<User> {
    try {
      const { username, passwordHash } = userLoginData;

      const user = await this.findByUsername(username);

      if (!user) {
        this.logger.error('Invalid credentials');
        return null;
      }

      const isPasswordMatching = await bcrypt.compare(passwordHash, user.passwordHash);

      if (!isPasswordMatching) {
        this.logger.error('Invalid credentials');
        return null;
      }

      return user;
    } catch (error) {
      this.logger.error(`Failed to validate user: ${error.message}`);
      return null;
    }
  }
}
