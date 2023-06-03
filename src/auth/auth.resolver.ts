import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginResultGraphQL, UserLoginInput } from './auth.interface';
import { Logger, UnauthorizedException } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  @Mutation(() => LoginResultGraphQL)
  async login(@Args('input') userLoginData: UserLoginInput): Promise<LoginResultGraphQL> {
    try {
      const result = await this.userService.validateUser(userLoginData);

      if (!result) {
        this.logger.warn(`Failed login attempt for username: ${userLoginData.username}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      return this.authService.login(result);
    } catch (error) {
      this.logger.error('Error in login', error.stack);
      throw error;
    }
  }
}
