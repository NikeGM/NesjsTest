import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book, CreateBookDto, UpdateBookDto } from './book.interface';
import { BookRepository } from './book.repository';

describe('BookController', () => {
  let bookController: BookController;
  let bookService: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService, BookRepository],
    }).compile();

    bookController = module.get<BookController>(BookController);
    bookService = module.get<BookService>(BookService);
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const books: Book[] = [
        {
          id: '1',
          title: 'Book 1',
          author: 'Author 1',
          description: 'Description 1',
          publicationDate: new Date(),
          price: 9.99,
          category: 'Category 1',
          coverImageURL: 'https://example.com/cover1.jpg',
        },
      ];
      jest.spyOn(bookService, 'findAll').mockResolvedValue(books);

      expect(await bookController.findAll()).toEqual(books);
    });
  });

  describe('findOne', () => {
    it('should return a book by ID', async () => {
      const book: Book = {
        id: '1',
        title: 'Book 1',
        author: 'Author 1',
        description: 'Description 1',
        publicationDate: new Date(),
        price: 9.99,
        category: 'Category 1',
        coverImageURL: 'https://example.com/cover1.jpg',
      };
      jest.spyOn(bookService, 'findById').mockResolvedValue(book);

      expect(await bookController.findOne('1')).toEqual(book);
    });
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'Book 1',
        author: 'Author 1',
        description: 'Description 1',
        publicationDate: new Date(),
        price: 9.99,
        category: 'Category 1',
        coverImageURL: 'https://example.com/cover1.jpg',
      };
      const book: Book = {
        id: '1',
        ...createBookDto,
      };
      jest.spyOn(bookService, 'create').mockResolvedValue(book);

      expect(await bookController.create(createBookDto)).toEqual(book);
    });
  });

  describe('update', () => {
    it('should update an existing book', async () => {
      const updateBookDto: UpdateBookDto = {
        title: 'Updated Book',
        author: 'Updated Author',
        description: 'Updated Description',
        publicationDate: new Date(),
        price: 19.99,
        category: 'Updated Category',
        coverImageURL: 'https://example.com/cover-updated.jpg',
      };
      const book: Book = {
        id: '1',
        title: 'Book 1',
        author: 'Author 1',
        description: 'Description 1',
        publicationDate: new Date(),
        price: 9.99,
        category: 'Category 1',
        coverImageURL: 'https://example.com/cover1.jpg',
      };
      jest.spyOn(bookService, 'update').mockResolvedValue(book);

      expect(await bookController.update('1', updateBookDto)).toEqual(book);
    });
  });

  describe('delete', () => {
    it('should delete a book by ID', async () => {
      const bookId = '1';
      jest.spyOn(bookService, 'delete');

      await bookController.delete(bookId);

      expect(bookService.delete).toHaveBeenCalledWith(bookId);
    });
  });
});
