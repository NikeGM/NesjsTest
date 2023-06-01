import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResultGraphQL, UserLoginData, UserLoginInput } from './auth.interface';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => LoginResultGraphQL)
  async login(
    @Args('input') userLoginInput: UserLoginInput,
  ): Promise<LoginResultGraphQL> {
    const user = await this.authService.validateUser(userLoginInput);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return this.authService.login(user);
  }
}
