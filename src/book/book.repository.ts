import { Injectable } from '@nestjs/common';
import { Book, CreateBookDto, UpdateBookDto } from './book.interface';

@Injectable()
export class BookRepository {
  private readonly books: Book[] = [];

  findAll(): Book[] {
    return this.books;
  }

  findById(id: string): Book {
    return this.books.find(book => book.id === id);
  }

  create(bookDto: CreateBookDto): Book {
    const book: Book = {
      id: this.generateUniqueId(),
      ...bookDto,
    };
    this.books.push(book);
    return book;
  }

  update(id: string, bookDto: UpdateBookDto): Book {
    const index = this.books.findIndex(book => book.id === id);
    if (index >= 0) {
      const updatedBook: Book = {
        ...this.books[index],
        ...bookDto,
      };
      this.books[index] = updatedBook;
      return updatedBook;
    }
    return null;
  }

  delete(id: string): void {
    const index = this.books.findIndex(book => book.id === id);
    if (index >= 0) {
      this.books.splice(index, 1);
    }
  }

  private generateUniqueId(): string {
    return Date.now().toString();
  }
}
