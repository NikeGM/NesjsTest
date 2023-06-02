import { Injectable } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './book.interface';
import { BookRepository } from './book.repository';
import { Book } from './entity/book.entity';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }

  async findById(bookId: number): Promise<Book> {
    return this.bookRepository.findById(bookId);
  }

  async create(book: CreateBookDto): Promise<Book> {
    return this.bookRepository.create(book);
  }

  async update(bookId: number, book: UpdateBookDto): Promise<Book> {
    return this.bookRepository.update(bookId, book);
  }

  async delete(bookId: number): Promise<void> {
    return this.bookRepository.delete(bookId);
  }
}
