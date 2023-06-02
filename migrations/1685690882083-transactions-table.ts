import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { DbTables } from '../src/types';

export class CreateTransactionsTable1685690882083 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: DbTables.TRANSACTIONS,
      columns: [
        {
          name: 'transactionId',
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
          name: 'action',
          type: 'enum',
          enum: ['buy', 'deposit']
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'amount',
          type: 'decimal'
        }
      ]
    }), true);

    await queryRunner.createForeignKey(DbTables.TRANSACTIONS, new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['userId'],
      referencedTableName: DbTables.USERS,
      onDelete: 'CASCADE'
    }));

    await queryRunner.createForeignKey(DbTables.TRANSACTIONS, new TableForeignKey({
      columnNames: ['bookId'],
      referencedColumnNames: ['bookId'],
      referencedTableName: DbTables.BOOKS,
      onDelete: 'CASCADE'
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DbTables.TRANSACTIONS);
  }
}
