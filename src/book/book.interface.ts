export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  publicationDate: Date;
  price: number;
  category: string;
  coverImageURL: string;
}

export class CreateBookDto {
  readonly title: string;
  readonly author: string;
  readonly description: string;
  readonly publicationDate: Date;
  readonly price: number;
  readonly category: string;
  readonly coverImageURL: string;
}

export class UpdateBookDto {
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
