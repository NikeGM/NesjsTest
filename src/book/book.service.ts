import { Injectable } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto, Book } from './book.interface';
import { BookRepository } from './book.repository';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }

  async findById(id: string): Promise<Book> {
    return this.bookRepository.findById(id);
  }

  async create(book: CreateBookDto): Promise<Book> {
    return this.bookRepository.create(book);
  }

  async update(id: string, book: UpdateBookDto): Promise<Book> {
    return this.bookRepository.update(id, book);
  }

  async delete(id: string): Promise<void> {
    return this.bookRepository.delete(id);
  }
}
