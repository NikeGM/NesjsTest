import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserBook } from './user-book.entity';
import { Transaction } from './transaction.entity';
import { DbTables } from '../../types';
import { UserRole } from '../user.interface';

@Entity(DbTables.USERS)
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  balance: number;

  @Column()
  username: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole;

  @Column()
  passwordHash: string;

  @OneToMany(() => UserBook, (userBook) => userBook.user)
  userBooks: UserBook[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}