import { InputType, Field, ObjectType } from '@nestjs/graphql';

export interface UserLoginData {
  nickname: string;
  password: string;
}

export interface JwtPayload {
  id: number;
}

export interface LoginResult {
  accessToken: string;
}

@InputType()
export class UserLoginInputGraphQL {
  @Field()
  nickname: string;

  @Field()
  passwordHash: string;
}

@ObjectType()
export class LoginResultGraphQL {
  @Field()
  accessToken: string;
}

@InputType()
export class UserLoginInput {
  @Field()
  nickname: string;

  @Field()
  password: string;
}
