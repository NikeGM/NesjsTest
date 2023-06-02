import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { DbTables } from '../../types';

@Entity(DbTables.BOOKS)
export class Book {
  @PrimaryGeneratedColumn()
  bookId: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp' })
  publicationDate: Date;

  @Column({ type: 'numeric' })
  price: number;

  @Column()
  category: string;

  @Column()
  coverImageURL: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}