import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { UserRole } from '../src/user/user.interface';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { DbTables } from '../src/types';
import { User } from '../src/user/entity/user.entity';

config();

export class CreateUserTable1685621583345 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: DbTables.USERS,
      columns: [
        {
          name: 'userId',
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
          type: 'varchar',
          isUnique: true
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
        }
      ]
    }), true);

    const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    const managerPassword = await bcrypt.hash(process.env.MANAGER_PASSWORD, 10);

    const admin = new User();
    admin.username = 'admin'
    admin.balance = 1000
    admin.role = UserRole.ADMIN
    admin.passwordHash = adminPassword
    await queryRunner.manager.save(admin);

    const manager = new User();
    manager.username = 'manager'
    manager.balance = 1000
    manager.role = UserRole.MANAGER
    manager.passwordHash = managerPassword
    await queryRunner.manager.save(manager);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DbTables.USERS);
  }

}
