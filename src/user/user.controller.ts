import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserDto, UserRole } from './user.interface';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../role/role.guard';
import { Roles } from '../role/role.decorator';
import { UserAccessGuard } from './user-access.guard';
import { User } from './entity/user.entity';
import { WinstonLogger as Logger } from 'nest-winston';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger
  ) {
  }

  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async findAll(): Promise<UserDto[]> {
    try {
      const users = await this.userService.findAll();
      this.logger.log(`Successfully fetched all users`);
      return users.map(this.userToDtoFormat);
    } catch (error) {
      this.logger.error(`Failed to fetch all users: ${error.message}`);
      return [];
    }
  }

  @Get(':userId')
  @UseGuards(AuthGuard(), UserAccessGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async findOne(@Param('userId') userId: number): Promise<UserDto> {
    try {
      const user = await this.userService.findById(userId);
      this.logger.log(`Successfully fetched user with ID: ${userId}`);
      return this.userToDtoFormat(user);
    } catch (error) {
      this.logger.error(`Failed to fetch user with ID: ${userId}. Error: ${error.message}`);
      return null;
    }
  }

  @Post()
  async create(@Body() input: CreateUserDto): Promise<UserDto> {
    try {
      const user = await this.userService.create(input);
      this.logger.log(`Successfully created user with ID: ${user.userId}`);
      return this.userToDtoFormat(user);
    } catch (error) {
      this.logger.error(`Failed to create user. Error: ${error.message}`);
      return null;
    }
  }

  @Put(':userId')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(@Param('userId') userId: number, @Body() input: UpdateUserDto): Promise<UserDto> {
    try {
      const user = await this.userService.update(userId, input);
      this.logger.log(`Successfully updated user with ID: ${userId}`);
      return this.userToDtoFormat(user);
    } catch (error) {
      this.logger.error(`Failed to update user with ID: ${userId}. Error: ${error.message}`);
      return null;
    }
  }

  @Delete(':userId')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  async delete(@Param('userId') userId: number): Promise<boolean> {
    try {
      const result = await this.userService.delete(userId);
      this.logger.log(`Successfully deleted user with ID: ${userId}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to delete user with ID: ${userId}. Error: ${error.message}`);
      return false;
    }
  }

  @Post('/buy')
  @UseGuards(AuthGuard())
  async buy(@Req() req, @Body('bookId') bookId: number) {
    try {
      const result = await this.userService.buy(req.user.userId, bookId);
      this.logger.log(`Successfully bought book with ID: ${bookId} for user with ID: ${req.user.userId}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to buy book with ID: ${bookId} for user with ID: ${req.user.userId}. Error: ${error.message}`);
      return null;
    }
  }

  private userToDtoFormat(user: User): UserDto {
    return {
      balance: user.balance,
      userId: user.userId,
      role: user.role
    };
  }
}
