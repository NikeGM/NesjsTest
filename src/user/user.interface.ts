import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column,PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  USER = 'USER',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
}

export interface CreateUserDto {
  readonly balance: number;
  readonly username: string;
  readonly role: UserRole;
  readonly password: string;
}

export interface UpdateUserDto {
  userId: number;
  readonly balance?: number;
  readonly username?: string;
  readonly role?: UserRole;
}


export interface UserDto {
  readonly userId: number;
  readonly balance?: number;
  readonly username?: string;
  readonly role?: UserRole;
}

@ObjectType()
export class UserGraphQL {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  userId: number;

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
  userId?: number;

  @Field(type => Int, { nullable: true })
  balance?: number;

  @Field({ nullable: true })
  username?: string;
}