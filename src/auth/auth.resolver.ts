import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginResultGraphQL, UserLoginInput } from './auth.interface';
import { Logger } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  @Mutation(() => LoginResultGraphQL)
  async login(@Args('input') userLoginData: UserLoginInput): Promise<LoginResultGraphQL | null> {
    try {
      const result = await this.userService.validateUser(userLoginData);

      if (!result) {
        this.logger.warn(`Failed login attempt for username: ${userLoginData.username}`);
        return null;
      }

      return this.authService.login(result);
    } catch (error) {
      this.logger.error('Error in login', error.stack);
      return null;
    }
  }
}
