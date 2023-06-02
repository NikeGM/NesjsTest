import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { BookService } from './book.service';
import { BookGraphQL, CreateBookDto, CreateBookGraphQL, UpdateBookDto, UpdateBookGraphQL } from './book.interface';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../role/role.guard';
import { Roles } from '../role/role.decorator';
import { UserRole } from '../user/user.interface';
import { Book } from './entity/book.entity';

@Resolver(of => BookGraphQL)
export class BookResolver {
  constructor(private readonly bookService: BookService) {
  }

  @Query(returns => [BookGraphQL])
  async findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Query(returns => BookGraphQL, { nullable: true })
  async findOne(@Args('bookId') bookId: number): Promise<Book> {
    return this.bookService.findById(bookId);
  }

  @Mutation(returns => BookGraphQL)
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async create(@Args('input') input: CreateBookGraphQL): Promise<Book> {
    return this.bookService.create(input);
  }

  @Mutation(returns => BookGraphQL)
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async update(@Args('bookId') bookId: number, @Args('input') input: UpdateBookGraphQL): Promise<Book> {
    return this.bookService.update(bookId, input);
  }

  @Mutation(returns => Boolean)
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async delete(@Args('bookId') bookId: number): Promise<boolean> {
    await this.bookService.delete(bookId);
    return true;
  }
}
