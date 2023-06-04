import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  USER = 'user',
  MANAGER = 'manager',
  ADMIN = 'admin',
}

export interface CreateUserDto {
  readonly username: string;
  readonly password: string;
}

export interface UpdateUserRoleDto {
  userId: number;
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
  @Field()
  username: string;

  @Field()
  @Column()
  password: string;
}

@InputType()
export class UpdateUserRoleGraphQL {
  @Field(type => Int, { nullable: true })
  userId?: number;

  @Field({ nullable: true })
  role?: UserRole;
}