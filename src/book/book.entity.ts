import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
}
