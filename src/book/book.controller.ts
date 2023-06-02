import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './book.interface';
import { BookService } from './book.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../role/role.guard';
import { Roles } from '../role/role.decorator';
import { UserRole } from '../user/user.interface';
import { Book } from './entity/book.entity';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {
  }

  @Get()
  async findAll(): Promise<Book[]> {
    return await this.bookService.findAll();
  }

  @Get(':bookId')
  async findOne(@Param('bookId') bookId: number): Promise<Book> {
    return await this.bookService.findById(bookId);
  }

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async create(@Body() book: CreateBookDto): Promise<Book> {
    return await this.bookService.create(book);
  }

  @Put(':bookId')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async update(@Param('bookId') bookId: number, @Body() book: UpdateBookDto): Promise<Book> {
    return await this.bookService.update(bookId, book);
  }

  @Delete(':bookId')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async delete(@Param('bookId') bookId: number): Promise<void> {
    await this.bookService.delete(bookId);
  }
}
