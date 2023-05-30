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