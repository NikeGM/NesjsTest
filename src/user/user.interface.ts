import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  balance: number;

  @Column()
  nickname: string;

  @Column()
  role: string;

  @Column()
  passwordHash: string;
}

export interface CreateUserDto {
  readonly balance: number;
  readonly nickname: string;
  readonly role: string;
  readonly password: string;
}

export interface UpdateUserDto {
  id: number;
  readonly balance?: number;
  readonly nickname?: string;
  readonly role?: string;
}


export interface UserDto {
  readonly id: number;
  readonly balance?: number;
  readonly nickname?: string;
  readonly role?: string;
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
  nickname: string;

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
  nickname: string;

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
  nickname?: string;
}