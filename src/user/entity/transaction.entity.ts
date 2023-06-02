import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { DbTables } from '../../types';

export enum TransactionAction {
  BUY = 'BUY',
  DEPOSIT = 'DEPOSIT',
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
    default: TransactionAction.BUY,
  })
  action: TransactionAction;

  @Column('numeric')
  amount: number;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
