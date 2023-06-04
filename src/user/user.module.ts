import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { UserBook } from './entity/user-book.entity';
import { Transaction } from './entity/transaction.entity';
import { Book } from '../book/entity/book.entity';
import { BookModule } from '../book/book.module';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './user.controller';

@Module({
  imports:
    [TypeOrmModule.forFeature([User, UserBook, Transaction, Book, UserRepository]),
      BookModule,
      PassportModule.register({ defaultStrategy: 'jwt' })
    ],
  providers: [UserRepository, UserService, UserController, Logger],
  exports: [TypeOrmModule, UserRepository, UserService, UserController]
})
export class UserModule {
}
