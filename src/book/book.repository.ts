import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto, UpdateBookDto } from './book.interface';
import { Book } from './entity/book.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class BookRepository {
  private readonly logger = new Logger(BookRepository.name);

  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ) {
  }

  async findAll(): Promise<Book[]> {
    try {
      return this.bookRepository.find();
    } catch (error) {
      this.logger.error('Error fetching all books', error.stack);
      return [];
    }
  }

  async findById(bookId: number): Promise<Book> {
    try {
      return this.bookRepository.findOne({ where: { bookId } });
    } catch (error) {
      this.logger.error(`Error fetching book with id ${bookId}`, error.stack);
      return null;
    }
  }

  async create(bookDto: CreateBookDto): Promise<Book> {
    try {
      const book = this.bookRepository.create(bookDto);
      return this.bookRepository.save(book);
    } catch (error) {
      this.logger.error('Error creating a book', error.stack);
      return null;
    }
  }

  async update(bookId: number, bookDto: UpdateBookDto): Promise<Book> {
    try {
      const book = await this.bookRepository.findOne({ where: { bookId } });
      if (book) {
        const updatedBook = this.bookRepository.merge(book, bookDto);
        return this.bookRepository.save(updatedBook);
      }
    } catch (error) {
      this.logger.error(`Error updating book with id ${bookId}`, error.stack);
    }
    return null;
  }

  async delete(bookId: number): Promise<boolean> {
    try {
      await this.bookRepository.delete(bookId);
      return true;
    } catch (error) {
      this.logger.error(`Error deleting book with id ${bookId}`, error.stack);
      return false;
    }
  }
}
