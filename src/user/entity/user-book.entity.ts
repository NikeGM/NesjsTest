import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn, JoinColumn
} from 'typeorm';
import { User } from './user.entity';
import { Book } from '../../book/entity/book.entity';
import { DbTables } from '../../types';

@Entity(DbTables.USER_BOOKS)
export class UserBook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  bookId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.userBooks)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Book, (book) => book)
  @JoinColumn({ name: 'bookId' })
  book: Book;
}
