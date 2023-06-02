import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';
import { BookResolver } from './book.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [BookController],
  providers: [BookService, BookRepository, BookResolver],
  imports: [
    TypeOrmModule.forFeature([Book]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ]
})
export class BookModule {
}