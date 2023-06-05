import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn
} from 'typeorm';
import { User } from './user.entity';
import { DbTables } from '../../types';

// Enum defining possible transaction actions
export enum TransactionAction {
  BUY = 'buy',
  DEPOSIT = 'deposit',
}

// Transaction entity for the database
@Entity(DbTables.TRANSACTIONS)
export class Transaction {

  // Unique id for each transaction
  @PrimaryGeneratedColumn()
  transactionId: number;

  // Id of the book involved in the transaction
  @Column()
  bookId: number;

  // Enum indicating the type of transaction
  @Column({
    type: 'enum',
    enum: TransactionAction,
    default: TransactionAction.BUY
  })
  action: TransactionAction;

  // The amount of the transaction
  @Column('numeric')
  amount: number;

  // The user involved in the transaction
  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'userId' })
  user: User;

  // Date when the transaction was created
  @CreateDateColumn()
  createdAt: Date;
}
