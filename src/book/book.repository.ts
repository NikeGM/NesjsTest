import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto, UpdateBookDto } from './book.interface';

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findById(id: string): Promise<Book> {
    return this.bookRepository.findOne({ where: { id } });
  }

  async create(bookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create(bookDto);
    return this.bookRepository.save(book);
  }

  async update(id: string, bookDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (book) {
      const updatedBook = this.bookRepository.merge(book, bookDto);
      return this.bookRepository.save(updatedBook);
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
