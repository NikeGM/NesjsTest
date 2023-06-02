import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto, User } from './user.interface';
import bcrypt from 'bcrypt';
import { UserLoginData } from '../auth/auth.interface';
import { Book } from '../book/book.interface';
import { UserBook } from './user-book.entity';
import { Transaction, TransactionAction } from './transaction.entity';
import { BookService } from '../book/book.service';

@Injectable()
export class UserService {
  private bcrypt: any;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(UserBook)
    private userBookRepository: Repository<UserBook>,
    @InjectRepository(Book)
    private bookService: BookService,
  ) {
  }

  async buy(userId: number, bookId: number): Promise<void> {
    const user = await this.findById(userId);
    const book = await this.bookService.findById(bookId);

    if (!user || !book) {
      throw new Error('User or book not found');
    }

    if (user.balance < book.price) {
      throw new Error('Insufficient balance');
    }

    await this.userRepository.manager.transaction(async (manager) => {
      user.balance -= book.price;
      await manager.save(user);

      const transaction = this.transactionRepository.create({
        user,
        bookId: book.id,
        action: TransactionAction.BUY,
        amount: book.price,
        createdAt: new Date(),
      });
      await manager.save(transaction);

      const userBook = this.userBookRepository.create({
        userId: user.id,
        bookId: book.id,
        createdAt: new Date(),
      });
      await manager.save(userBook);
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(input: CreateUserDto): Promise<User> {
    const hashedPassword = await this.bcrypt.hash(input.password, 10);
    const newUser = this.userRepository.create({
      ...input,
      passwordHash: hashedPassword
    });

    return this.userRepository.save(newUser);
  }

  async update(id: number, input: UpdateUserDto): Promise<User> {
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

  async validateUser(userLoginData: UserLoginData): Promise<User> {
    const { username, passwordHash } = userLoginData;

    const user = await this.findByUsername(username);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordMatching = await bcrypt.compare(passwordHash, user.passwordHash);

    if (!isPasswordMatching) {
      throw new Error('Invalid credentials');
    }

    return user;
  }
}
