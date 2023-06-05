import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { DbTables } from '../../types';

// Book entity
@Entity(DbTables.BOOKS)
export class Book {
  // Unique book ID
  @PrimaryGeneratedColumn()
  bookId: number;

  // Title of the book
  @Column()
  title: string;

  // Author of the book
  @Column()
  author: string;

  // Description of the book
  @Column()
  description: string;

  // Publication date of the book
  @Column({ type: 'timestamp' })
  publicationDate: Date;

  // Price of the book
  @Column({ type: 'numeric' })
  price: number;

  // Category of the book
  @Column()
  category: string;

  // Cover image URL of the book
  @Column()
  coverImageURL: string;

  // Date when the book was added to the database
  @CreateDateColumn()
  createdAt: Date;

  // Date when the book was last updated in the database
  @UpdateDateColumn()
  updatedAt: Date;
}