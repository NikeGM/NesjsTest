import { InputType, Field, ObjectType } from '@nestjs/graphql';

export interface UserLoginData {
  username: string;
  password: string;
}

export interface JwtPayload {
  userId: number;
}

export interface LoginResult {
  accessToken: string;
  expiresId: number;
}

@InputType()
export class UserLoginInputGraphQL {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
export class LoginResultGraphQL {
  @Field()
  accessToken: string;
  @Field()
  expiresIn: number;
}

@InputType()
export class UserLoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
