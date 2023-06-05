import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from './book.interface';
import { BookService } from './book.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../role/role.guard';
import { Roles } from '../role/role.decorator';
import { UserRole } from '../user/user.interface';
import { Book } from './entity/book.entity';
import { Logger } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';

// Controller for books
@Controller('books')
export class BookController {
  private readonly logger = new Logger(BookController.name);

  constructor(private readonly bookService: BookService) {
  }

  // Get all books
  @Get()
  async findAll(): Promise<Book[]> {
    try {
      return await this.bookService.findAll();
    } catch (error) {
      this.logger.error('Error fetching all books', error.stack);
      throw new InternalServerErrorException('Error fetching all books');
    }
  }

  // Get one book by id
  @Get(':bookId')
  async findOne(@Param('bookId') bookId: number): Promise<Book> {
    try {
      const book = await this.bookService.findById(bookId);
      if (!book) {
        this.logger.warn(`No book found with id ${bookId}`);
        throw new NotFoundException(`No book found with id ${bookId}`);
      }
      return book;
    } catch (error) {
      this.logger.error(`Error fetching book with id ${bookId}`, error.stack);
      throw new InternalServerErrorException('Error fetching book');
    }
  }

  // Create a new book
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async create(@Body() book: CreateBookDto): Promise<Book> {
    try {
      return await this.bookService.create(book);
    } catch (error) {
      this.logger.error('Error creating a book', error.stack);
      throw new InternalServerErrorException('Error creating a book');
    }
  }

  // Update a book by id
  @Put(':bookId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async update(@Param('bookId') bookId: number, @Body() book: UpdateBookDto): Promise<Book> {
    try {
      return await this.bookService.update(bookId, book);
    } catch (error) {
      this.logger.error(`Error updating book with id ${bookId}`, error.stack);
      throw new InternalServerErrorException('Error updating a book');
    }
  }

  // Delete a book by id
  @Delete(':bookId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async delete(@Param('bookId') bookId: number): Promise<void> {
    try {
      await this.bookService.delete(bookId);
    } catch (error) {
      this.logger.error(`Error deleting book with id ${bookId}`, error.stack);
      throw new InternalServerErrorException('Error deleting a book');
    }
  }
}
