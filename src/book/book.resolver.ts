import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book, BookGraphQL, CreateBookDto, UpdateBookDto } from './book.interface';

@Resolver(of => BookGraphQL)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(returns => [BookGraphQL])
  async findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Query(returns => BookGraphQL, { nullable: true })
  async findOne(@Args('id') id: string): Promise<Book> {
    return this.bookService.findById(id);
  }

  @Mutation(returns => BookGraphQL)
  async create(@Args('input') input: CreateBookDto): Promise<Book> {
    return this.bookService.create(input);
  }

  @Mutation(returns => BookGraphQL)
  async update(@Args('id') id: string, @Args('input') input: UpdateBookDto): Promise<Book> {
    return this.bookService.update(id, input);
  }

  @Mutation(returns => Boolean) 
  async delete(@Args('id') id: string): Promise<boolean> {
    await this.bookService.delete(id);
    return true;
  }
}
