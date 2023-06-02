import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { UserRole } from '../src/user/user.interface';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';

config();

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
          name: 'username',
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
        },
        {
          name: 'amount',
          type: 'decimal'
        }
      ]
    }), true);

    const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    const managerPassword = await bcrypt.hash(process.env.MANAGER_PASSWORD, 10);
    await queryRunner.query(`INSERT INTO user (username, balance, role, passwordHash) VALUES ('admin', 1000, 'ADMIN', '${adminPassword}')`);
    await queryRunner.query(`INSERT INTO user (username, balance, role, passwordHash) VALUES ('manager', 1000, 'MANAGER', '${managerPassword}')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }

}
