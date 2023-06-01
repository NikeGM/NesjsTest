import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { UserRole } from '../src/user/user.interface';

export class CreateUserTable1685621583345 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'user',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'balance',
          type: 'decimal'
        },
        {
          name: 'nickname',
          type: 'varchar'
        },
        {
          name: 'role',
          type: 'enum',
          enum: Object.values(UserRole),
          default: `'${UserRole.USER}'`
        },
        {
          name: 'passwordHash',
          type: 'varchar'
        }
      ]
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }

}
