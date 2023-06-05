// DTO for creating a book
export interface CreateBookDto {
  readonly title: string;
  readonly author: string;
  readonly description: string;
  readonly publicationDate: Date;
  readonly price: number;
  readonly category: string;
  readonly coverImageURL: string;
}

// DTO for updating a book
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

// GraphQL object type for a book
@ObjectType()
export class BookGraphQL {
  @Field(type => ID)
  bookId: number;

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

// GraphQL input type for creating a book
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

// GraphQL input type for updating a book
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
