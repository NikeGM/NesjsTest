import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';
import { BookResolver } from './book.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';

@Module({
  controllers: [BookController],
  providers: [BookService, BookRepository, BookResolver],
  imports: [
    TypeOrmModule.forFeature([Book]),
  ]
})
export class BookModule {}