import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { BookService } from './book.service';
import { BookGraphQL, CreateBookDto, CreateBookGraphQL, UpdateBookDto, UpdateBookGraphQL } from './book.interface';
import { UseGuards, NotFoundException, InternalServerErrorException, CanActivate } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard, RolesGuardGraphQL } from '../role/role.guard';
import { Roles } from '../role/role.decorator';
import { UserRole } from '../user/user.interface';
import { Book } from './entity/book.entity';
import { Logger } from '@nestjs/common';
import { AuthGuardGraphQL } from '../auth/auth.guard';

@Resolver(of => BookGraphQL)
export class BookResolver {
  private readonly logger = new Logger(BookResolver.name);

  constructor(private readonly bookService: BookService) {
  }

  @Query(returns => [BookGraphQL])
  async getBooks(): Promise<Book[]> {
    try {
      return this.bookService.findAll();
    } catch (error) {
      this.logger.error('Error fetching all books', error.stack);
      throw new InternalServerErrorException('Error fetching all books');
    }
  }

  @Query(returns => BookGraphQL, { nullable: true })
  async getBook(@Args('bookId') bookId: number): Promise<Book> {
    try {
      const book = await this.bookService.findById(bookId);
      if (!book) {
        throw new NotFoundException(`Book with ID ${bookId} not found`);
      }
      return book;
    } catch (error) {
      this.logger.error(`Error fetching book with id ${bookId}`, error.stack);
      throw new InternalServerErrorException('Error fetching book');
    }
  }

  @Mutation(returns => BookGraphQL)
  @UseGuards(AuthGuardGraphQL, RolesGuardGraphQL)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async createBook(@Args('input') input: CreateBookGraphQL): Promise<Book> {
    try {
      return this.bookService.create(input);
    } catch (error) {
      this.logger.error('Error creating a book', error.stack);
      throw new InternalServerErrorException('Error creating a book');
    }
  }

  @Mutation(returns => BookGraphQL)
  @UseGuards(AuthGuardGraphQL, RolesGuardGraphQL)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async updateBook(@Args('bookId') bookId: number, @Args('input') input: UpdateBookGraphQL): Promise<Book> {
    try {
      const book = await this.bookService.update(bookId, input);
      if (!book) {
        throw new NotFoundException(`Book with ID ${bookId} not found`);
      }
      return book;
    } catch (error) {
      this.logger.error(`Error updating book with id ${bookId}`, error.stack);
      throw new InternalServerErrorException('Error updating a book');
    }
  }

  @Mutation(returns => Boolean)
  @UseGuards(AuthGuardGraphQL, RolesGuardGraphQL)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async deleteBook(@Args('bookId') bookId: number): Promise<boolean> {
    try {
      const result = await this.bookService.delete(bookId);
      if (!result) {
        throw new NotFoundException(`Book with ID ${bookId} not found`);
      }
      return true;
    } catch (error) {
      this.logger.error(`Error deleting book with id ${bookId}`, error.stack);
      throw new InternalServerErrorException('Error deleting a book');
    }
  }
}
