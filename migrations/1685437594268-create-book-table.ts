import { Book } from 'src/book/book.interface';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBooksTable1685437594268 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'books',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'title',
            type: 'varchar'
          },
          {
            name: 'author',
            type: 'varchar'
          },
          {
            name: 'description',
            type: 'text'
          },
          {
            name: 'publicationDate',
            type: 'timestamp'
          },
          {
            name: 'price',
            type: 'numeric'
          },
          {
            name: 'category',
            type: 'varchar'
          },
          {
            name: 'coverImageURL',
            type: 'varchar'
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    );

    const book1 = new Book();
    book1.title = 'Book 1';
    book1.author = 'Author 1';
    book1.description = 'Description 1';
    book1.publicationDate = new Date();
    book1.price = 9.99;
    book1.category = 'Fiction';
    book1.coverImageURL = 'URL 1';
    await queryRunner.manager.save(book1);

    const book2 = new Book();
    book2.title = 'Book 2';
    book2.author = 'Author 2';
    book2.description = 'Description 2';
    book2.publicationDate = new Date();
    book2.price = 14.99;
    book2.category = 'Non-fiction';
    book2.coverImageURL = 'URL 2';
    await queryRunner.manager.save(book2);

    const book3 = new Book();
    book3.title = 'Book 3';
    book3.author = 'Author 3';
    book3.description = 'Description 3';
    book3.publicationDate = new Date();
    book3.price = 19.99;
    book3.category = 'Fiction';
    book3.coverImageURL = 'URL 3';
    await queryRunner.manager.save(book3);

    const book4 = new Book();
    book4.title = 'Book 4';
    book4.author = 'Author 4';
    book4.description = 'Description 4';
    book4.publicationDate = new Date();
    book4.price = 24.99;
    book4.category = 'Non-fiction';
    book4.coverImageURL = 'URL 4';
    await queryRunner.manager.save(book4);

    const book5 = new Book();
    book5.title = 'Book 5';
    book5.author = 'Author 5';
    book5.description = 'Description 5';
    book5.publicationDate = new Date();
    book5.price = 29.99;
    book5.category = 'Fiction';
    book5.coverImageURL = 'URL 5';
    await queryRunner.manager.save(book5);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('books');
  }
}
