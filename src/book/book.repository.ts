import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto, UpdateBookDto } from './book.interface';
import { Book } from './entity/book.entity';
import { Logger } from '@nestjs/common';

// BookRepository is a service class that provides methods to interact with the book data in the database
@Injectable()
export class BookRepository {
  private readonly logger = new Logger(BookRepository.name);

  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ) {
  }

  // Fetch all books from the database
  async findAll(): Promise<Book[]> {
    try {
      return this.bookRepository.find();
    } catch (error) {
      this.logger.error('Error fetching all books', error.stack);
      throw new InternalServerErrorException('Error fetching all books');
    }
  }

  // Fetch a book from the database by id
  async findById(bookId: number): Promise<Book> {
    try {
      const book = await this.bookRepository.findOne({ where: { bookId } });
      if (!book) {
        throw new NotFoundException(`Book with ID ${bookId} not found`);
      }
      return book;
    } catch (error) {
      this.logger.error(`Error fetching book with id ${bookId}`, error.stack);
      throw new InternalServerErrorException('Error fetching book');
    }
  }

  // Create a new book in the database
  async create(bookDto: CreateBookDto): Promise<Book> {
    try {
      const book = this.bookRepository.create(bookDto);
      return this.bookRepository.save(book);
    } catch (error) {
      this.logger.error('Error creating a book', error.stack);
      throw new InternalServerErrorException('Error creating a book');
    }
  }

  // Update a book in the database by id
  async update(bookId: number, bookDto: UpdateBookDto): Promise<Book> {
    try {
      const book = await this.bookRepository.findOne({ where: { bookId } });
      if (!book) {
        throw new NotFoundException(`Book with ID ${bookId} not found`);
      }
      const updatedBook = this.bookRepository.merge(book, bookDto);
      return this.bookRepository.save(updatedBook);
    } catch (error) {
      this.logger.error(`Error updating book with id ${bookId}`, error.stack);
      throw new InternalServerErrorException('Error updating a book');
    }
  }

  // Delete a book from the database by id
  async delete(bookId: number): Promise<boolean> {
    try {
      const deleteResult = await this.bookRepository.delete(bookId);
      if (deleteResult.affected === 0) {
        throw new NotFoundException(`Book with ID ${bookId} not found`);
      }
      return true;
    } catch (error) {
      this.logger.error(`Error deleting book with id ${bookId}`, error.stack);
      throw new InternalServerErrorException('Error deleting a book');
    }
  }
}
