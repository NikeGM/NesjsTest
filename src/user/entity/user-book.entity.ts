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

// Entity that connects users and books
@Entity(DbTables.USER_BOOKS)
export class UserBook {
  // Unique id of user-book relation
  @PrimaryGeneratedColumn()
  id: number;

  // Id of the user
  @Column()
  userId: number;

  // Id of the book
  @Column()
  bookId: number;

  // Date when the user-book relation was created
  @CreateDateColumn()
  createdAt: Date;

  // Link to the user entity
  @ManyToOne(() => User, (user) => user.userBooks)
  @JoinColumn({ name: 'userId' })
  user: User;

  // Link to the book entity
  @ManyToOne(() => Book, (book) => book)
  @JoinColumn({ name: 'bookId' })
  book: Book;
}
