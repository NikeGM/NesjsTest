import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto, UpdateBookDto } from './book.interface';
import { Book } from './entity/book.entity';

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ) {
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findById(bookId: number): Promise<Book> {
    return this.bookRepository.findOne({ where: { bookId } });
  }

  async create(bookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create(bookDto);
    return this.bookRepository.save(book);
  }

  async update(bookId: number, bookDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { bookId } });
    if (book) {
      const updatedBook = this.bookRepository.merge(book, bookDto);
      return this.bookRepository.save(updatedBook);
    }
    return null;
  }

  async delete(bookId: number): Promise<void> {
    await this.bookRepository.delete(bookId);
  }
}
