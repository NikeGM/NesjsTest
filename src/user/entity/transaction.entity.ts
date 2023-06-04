import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn, JoinColumn
} from 'typeorm';
import { User } from './user.entity';
import { DbTables } from '../../types';

export enum TransactionAction {
  BUY = 'buy',
  DEPOSIT = 'deposit',
}

@Entity(DbTables.TRANSACTIONS)
export class Transaction {
  @PrimaryGeneratedColumn()
  transactionId: number;

  @Column()
  bookId: number;

  @Column({
    type: 'enum',
    enum: TransactionAction,
    default: TransactionAction.BUY
  })
  action: TransactionAction;

  @Column('numeric')
  amount: number;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
