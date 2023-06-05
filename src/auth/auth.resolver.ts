import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginResultGraphQL, UserLoginInput } from './auth.interface';
import { Logger, UnauthorizedException } from '@nestjs/common';

// GraphQL resolver for authentication related operations
@Resolver()
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  // GraphQL mutation for user login
  @Mutation(() => LoginResultGraphQL)
  async login(@Args('input') userLoginData: UserLoginInput): Promise<LoginResultGraphQL> {
    try {
      // Validate the user
      const result = await this.userService.validateUser({
        password: userLoginData.password,
        username: userLoginData.username
      });

      // If validation fails, log the attempt and throw an exception
      if (!result) {
        this.logger.warn(`Failed login attempt for username: ${userLoginData.username}`);
        throw new UnauthorizedException('Invalid credentials');
      }

      // If validation is successful, login the user
      return this.authService.login({
        password: userLoginData.password,
        username: userLoginData.username
      });
    } catch (error) {
      this.logger.error('Error in login', error.stack);
      throw error;
    }
  }
}
