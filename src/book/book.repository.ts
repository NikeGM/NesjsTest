import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
      throw new InternalServerErrorException('Error fetching all books');
    }
  }

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

  async create(bookDto: CreateBookDto): Promise<Book> {
    try {
      const book = this.bookRepository.create(bookDto);
      return this.bookRepository.save(book);
    } catch (error) {
      this.logger.error('Error creating a book', error.stack);
      throw new InternalServerErrorException('Error creating a book');
    }
  }

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
