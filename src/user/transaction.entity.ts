import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.interface';

export enum TransactionAction {
  BUY = 'BUY',
  DEPOSIT = 'DEPOSIT',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

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
