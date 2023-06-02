import { Injectable } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './book.interface';
import { BookRepository } from './book.repository';
import { Book } from './entity/book.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class BookService {
  private readonly logger = new Logger(BookService.name);

  constructor(private readonly bookRepository: BookRepository) {
  }

  async findAll(): Promise<Book[]> {
    try {
      return await this.bookRepository.findAll();
    } catch (error) {
      this.logger.error('Error fetching all books', error.stack);
      return [];
    }
  }

  async findById(bookId: number): Promise<Book> {
    try {
      return await this.bookRepository.findById(bookId);
    } catch (error) {
      this.logger.error(`Error fetching book with id ${bookId}`, error.stack);
      return null;
    }
  }

  async create(book: CreateBookDto): Promise<Book> {
    try {
      return await this.bookRepository.create(book);
    } catch (error) {
      this.logger.error('Error creating a book', error.stack);
      return null;
    }
  }

  async update(bookId: number, book: UpdateBookDto): Promise<Book> {
    try {
      return await this.bookRepository.update(bookId, book);
    } catch (error) {
      this.logger.error(`Error updating book with id ${bookId}`, error.stack);
      return null;
    }
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
