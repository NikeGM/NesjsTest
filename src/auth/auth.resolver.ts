import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginResultGraphQL, UserLoginInput } from './auth.interface';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  @Mutation(() => LoginResultGraphQL)
  async login(@Args('input') userLoginData: UserLoginInput): Promise<LoginResultGraphQL> {
    const result = await this.userService.validateUser(userLoginData);

    if (!result) {
      throw new Error('Invalid credentials');
    }

    return this.authService.login(result);

  }
}
