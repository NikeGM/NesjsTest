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
                      generationStrategy: 'increment',
                  },
                  {
                      name: 'title',
                      type: 'varchar',
                  },
                  {
                      name: 'author',
                      type: 'varchar',
                  },
                  {
                      name: 'description',
                      type: 'text',
                  },
                  {
                      name: 'publicationDate',
                      type: 'timestamp',
                  },
                  {
                      name: 'price',
                      type: 'numeric',
                  },
                  {
                      name: 'category',
                      type: 'varchar',
                  },
                  {
                      name: 'coverImageURL',
                      type: 'varchar',
                  },
              ],
          }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('books');
    }
}
