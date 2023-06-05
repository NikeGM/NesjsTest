import { InputType, Field, ObjectType } from '@nestjs/graphql';

// Data transfer object for user login
export interface UserLoginData {
  username: string;
  password: string;
}

// Payload of JWT
export interface JwtPayload {
  userId: number;
}

// Result of successful login
export interface LoginResult {
  accessToken: string;
  expiresId: number;
}

// GraphQL input type for user login
@InputType()
export class UserLoginInputGraphQL {
  @Field()
  username: string;

  @Field()
  password: string;
}

// GraphQL object type for login result
@ObjectType()
export class LoginResultGraphQL {
  @Field()
  accessToken: string;

  @Field()
  expiresIn: number;
}

// Input type for user login
export class UserLoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
