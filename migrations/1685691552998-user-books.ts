import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';
import { DbTables } from '../src/types';

export class CreateUserBooksTable1685691552998 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DbTables.USER_BOOKS,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'userId',
            type: 'int'
          },
          {
            name: 'bookId',
            type: 'int'
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      }),
      true
    );

    await queryRunner.createForeignKey(
      DbTables.USER_BOOKS,
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['userId'],
        referencedTableName: DbTables.USERS,
        onDelete: 'CASCADE'
      })
    );

    await queryRunner.createForeignKey(
      DbTables.USER_BOOKS,
      new TableForeignKey({
        columnNames: ['bookId'],
        referencedColumnNames: ['bookId'],
        referencedTableName: DbTables.BOOKS,
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DbTables.USER_BOOKS);
  }
}
