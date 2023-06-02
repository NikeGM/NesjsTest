import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './book.interface';
import { BookService } from './book.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../role/role.guard';
import { Roles } from '../role/role.decorator';
import { UserRole } from '../user/user.interface';
import { Book } from './entity/book.entity';
import { Logger } from '@nestjs/common';

@Controller('books')
export class BookController {
  private readonly logger = new Logger(BookController.name);

  constructor(private readonly bookService: BookService) {
  }

  @Get()
  async findAll(): Promise<Book[]> {
    try {
      return await this.bookService.findAll();
    } catch (error) {
      this.logger.error('Error fetching all books', error.stack);
      return [];
    }
  }

  @Get(':bookId')
  async findOne(@Param('bookId') bookId: number): Promise<Book> {
    try {
      return await this.bookService.findById(bookId);
    } catch (error) {
      this.logger.error(`Error fetching book with id ${bookId}`, error.stack);
      return null;
    }
  }

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async create(@Body() book: CreateBookDto): Promise<Book> {
    try {
      return await this.bookService.create(book);
    } catch (error) {
      this.logger.error('Error creating a book', error.stack);
      return null;
    }
  }

  @Put(':bookId')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async update(@Param('bookId') bookId: number, @Body() book: UpdateBookDto): Promise<Book> {
    try {
      return await this.bookService.update(bookId, book);
    } catch (error) {
      this.logger.error(`Error updating book with id ${bookId}`, error.stack);
      return null;
    }
  }

  @Delete(':bookId')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async delete(@Param('bookId') bookId: number): Promise<void> {
    try {
      await this.bookService.delete(bookId);
    } catch (error) {
      this.logger.error(`Error deleting book with id ${bookId}`, error.stack);
    }
  }
}
