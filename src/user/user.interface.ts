import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

// Defines the possible roles a user can have.
export enum UserRole {
  USER = 'user',
  MANAGER = 'manager',
  ADMIN = 'admin',
}

// Data Transfer Object (DTO) for creating a new user.
export interface CreateUserDto {
  readonly username: string;
  readonly password: string;
}

// DTO for updating a user's role.
export interface UpdateUserRoleDto {
  userId: number;
  readonly role?: UserRole;
}

// DTO for retrieving user data.
export interface UserDto {
  readonly userId: number;
  readonly balance?: number;
  readonly username?: string;
  readonly role?: UserRole;
}

// GraphQL object type for a user.
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

// GraphQL input type for creating a user.
@InputType()
export class CreateUserGraphQL {
  @Field()
  username: string;

  @Field()
  @Column()
  password: string;
}

// GraphQL input type for updating a user's role.
@InputType()
export class UpdateUserRoleGraphQL {
  @Field(type => Int, { nullable: true })
  userId?: number;

  @Field({ nullable: true })
  role?: UserRole;
}