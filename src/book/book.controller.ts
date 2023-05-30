import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Book, CreateBookDto, UpdateBookDto } from './book.interface';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return await this.bookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book> {
    return await this.bookService.findById(id);
  }

  @Post()
  async create(@Body() book: CreateBookDto): Promise<Book> {
    return await this.bookService.create(book);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() book: UpdateBookDto): Promise<Book> {
    return await this.bookService.update(id, book);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.bookService.delete(id);
  }
}
