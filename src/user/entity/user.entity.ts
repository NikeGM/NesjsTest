import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserBook } from './user-book.entity';
import { Transaction } from './transaction.entity';
import { DbTables } from '../../types';
import { UserRole } from '../user.interface';

// User entity in the database
@Entity(DbTables.USERS)
export class User {
  // Unique id for each user
  @PrimaryGeneratedColumn()
  userId: number;

  // User's balance
  @Column()
  balance: number;

  // User's username
  @Column()
  username: string;

  // Role of the user, default is UserRole.USER
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole;

  // Hash of the user's password
  @Column()
  passwordHash: string;

  // Array of books owned by the user
  @OneToMany(() => UserBook, (userBook) => userBook.user)
  userBooks: UserBook[];

  // Array of transactions made by the user
  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  // Date when the user was created
  @CreateDateColumn()
  createdAt: Date;

  // Date when the user's details were last updated
  @UpdateDateColumn()
  updatedAt: Date;
}
