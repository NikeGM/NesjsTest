import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './book.interface';
import { BookRepository } from './book.repository';
import { Book } from './entity/book.entity';
import { Logger } from '@nestjs/common';

// The BookService class is a provider that contains logic related to books
@Injectable()
export class BookService {
  private readonly logger = new Logger(BookService.name);

  constructor(private readonly bookRepository: BookRepository) {
  }

  // Fetch all books
  async findAll(): Promise<Book[]> {
    try {
      return await this.bookRepository.findAll();
    } catch (error) {
      this.logger.error('Error fetching all books', error.stack);
      throw new InternalServerErrorException('Error fetching all books');
    }
  }

  // Fetch a book by id
  async findById(bookId: number): Promise<Book> {
    try {
      const book = await this.bookRepository.findById(bookId);
      if (!book) {
        throw new NotFoundException(`Book with ID ${bookId} not found`);
      }
      return book;
    } catch (error) {
      this.logger.error(`Error fetching book with id ${bookId}`, error.stack);
      throw new InternalServerErrorException('Error fetching book');
    }
  }

  // Create a new book
  async create(book: CreateBookDto): Promise<Book> {
    try {
      return await this.bookRepository.create(book);
    } catch (error) {
      this.logger.error('Error creating a book', error.stack);
      throw new InternalServerErrorException('Error creating a book');
    }
  }

  // Update a book by id
  async update(bookId: number, book: UpdateBookDto): Promise<Book> {
    try {
      const updatedBook = await this.bookRepository.update(bookId, book);
      if (!updatedBook) {
        throw new NotFoundException(`Book with ID ${bookId} not found`);
      }
      return updatedBook;
    } catch (error) {
      this.logger.error(`Error updating book with id ${bookId}`, error.stack);
      throw new InternalServerErrorException('Error updating a book');
    }
  }

  // Delete a book by id
  async delete(bookId: number): Promise<boolean> {
    try {
      const result = await this.bookRepository.delete(bookId);
      if (!result) {
        throw new NotFoundException(`Book with ID ${bookId} not found`);
      }
      return true;
    } catch (error) {
      this.logger.error(`Error deleting book with id ${bookId}`, error.stack);
      throw new InternalServerErrorException('Error deleting a book');
    }
  }
}
