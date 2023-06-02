import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

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

export interface CreateBookDto {
  readonly title: string;
  readonly author: string;
  readonly description: string;
  readonly publicationDate: Date;
  readonly price: number;
  readonly category: string;
  readonly coverImageURL: string;
}

export interface UpdateBookDto {
  readonly title?: string;
  readonly author?: string;
  readonly description?: string;
  readonly publicationDate?: Date;
  readonly price?: number;
  readonly category?: string;
  readonly coverImageURL?: string;
}

import { Field, Float, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BookGraphQL {
  @Field(type => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  author: string;

  @Field()
  description: string;

  @Field()
  publicationDate: Date;

  @Field(type => Float)
  price: number;

  @Field()
  category: string;

  @Field()
  coverImageURL: string;
}

@InputType()
export class CreateBookGraphQL {
  @Field()
  title: string;

  @Field()
  author: string;

  @Field()
  description: string;

  @Field()
  publicationDate: Date;

  @Field(type => Float)
  price: number;

  @Field()
  category: string;

  @Field()
  coverImageURL: string;
}

@InputType()
export class UpdateBookGraphQL {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  publicationDate?: Date;

  @Field(type => Float, { nullable: true })
  price?: number;

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  coverImageURL?: string;
}
