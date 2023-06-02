import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTransactionsTable1685690882083 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'transactions',
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

    await queryRunner.createForeignKey('transactions', new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE'
    }));

    await queryRunner.createForeignKey('transactions', new TableForeignKey({
      columnNames: ['bookId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'books',
      onDelete: 'CASCADE'
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
  }
}
