import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { BookService } from './book.service';
import { BookGraphQL, CreateBookDto, CreateBookGraphQL, UpdateBookDto, UpdateBookGraphQL } from './book.interface';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../role/role.guard';
import { Roles } from '../role/role.decorator';
import { UserRole } from '../user/user.interface';
import { Book } from './entity/book.entity';
import { Logger } from '@nestjs/common';

@Resolver(of => BookGraphQL)
export class BookResolver {
  private readonly logger = new Logger(BookResolver.name);

  constructor(private readonly bookService: BookService) {
  }

  @Query(returns => [BookGraphQL])
  async findAll(): Promise<Book[]> {
    try {
      return this.bookService.findAll();
    } catch (error) {
      this.logger.error('Error fetching all books', error.stack);
      return [];
    }
  }

  @Query(returns => BookGraphQL, { nullable: true })
  async findOne(@Args('bookId') bookId: number): Promise<Book> {
    try {
      return this.bookService.findById(bookId);
    } catch (error) {
      this.logger.error(`Error fetching book with id ${bookId}`, error.stack);
      return null;
    }
  }

  @Mutation(returns => BookGraphQL)
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async create(@Args('input') input: CreateBookGraphQL): Promise<Book> {
    try {
      return this.bookService.create(input);
    } catch (error) {
      this.logger.error('Error creating a book', error.stack);
      return null;
    }
  }

  @Mutation(returns => BookGraphQL)
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async update(@Args('bookId') bookId: number, @Args('input') input: UpdateBookGraphQL): Promise<Book> {
    try {
      return this.bookService.update(bookId, input);
    } catch (error) {
      this.logger.error(`Error updating book with id ${bookId}`, error.stack);
      return null;
    }
  }

  @Mutation(returns => Boolean)
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async delete(@Args('bookId') bookId: number): Promise<boolean> {
    try {
      await this.bookService.delete(bookId);
      return true;
    } catch (error) {
      this.logger.error(`Error deleting book with id ${bookId}`, error.stack);
      return false;
    }
  }
}
