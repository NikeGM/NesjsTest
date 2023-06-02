import { InputType, Field, ObjectType } from '@nestjs/graphql';

export interface UserLoginData {
  username: string;
  passwordHash: string;
}

export interface JwtPayload {
  id: number;
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
  passwordHash: string;
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
  passwordHash: string;
}
