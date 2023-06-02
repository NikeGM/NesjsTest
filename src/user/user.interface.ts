import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserBook } from './user-book.entity';
import { Transaction } from './transaction.entity';

export enum UserRole {
  USER = 'USER',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  balance: number;

  @Column()
  username: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole;

  @Column()
  passwordHash: string;

  @OneToMany(() => UserBook, (userBook) => userBook.user)
  userBooks: UserBook[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export interface CreateUserDto {
  readonly balance: number;
  readonly username: string;
  readonly role: UserRole;
  readonly password: string;
}

export interface UpdateUserDto {
  id: number;
  readonly balance?: number;
  readonly username?: string;
  readonly role?: UserRole;
}


export interface UserDto {
  readonly id: number;
  readonly balance?: number;
  readonly username?: string;
  readonly role?: UserRole;
}

@ObjectType()
export class UserGraphQL {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => Int)
  @Column()
  balance: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  role: string;

  @Field()
  @Column()
  passwordHash: string;
}

@InputType()
export class CreateUserGraphQL {
  @Field(type => Int)
  balance: number;

  @Field()
  username: string;

  @Field()
  role: string;
}

@InputType()
export class UpdateUserGraphQL {
  @Field(type => Int, { nullable: true })
  id?: number;

  @Field(type => Int, { nullable: true })
  balance?: number;

  @Field({ nullable: true })
  username?: string;
}