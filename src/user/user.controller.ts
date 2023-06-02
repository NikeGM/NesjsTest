import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserDto, UserRole } from './user.interface';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../role/role.guard';
import { Roles } from '../role/role.decorator';
import { UserAccessGuard } from './user-access.guard';
import { User } from './entity/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async findAll(): Promise<UserDto[]> {
    const users = await this.userService.findAll();
    return users.map(this.userToDtoFormat);
  }

  @Get(':userId')
  @UseGuards(AuthGuard(), UserAccessGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async findOne(@Param('userId') userId: number): Promise<UserDto> {
    const user = await this.userService.findById(userId);
    return this.userToDtoFormat(user);
  }

  @Post()
  async create(@Body() input: CreateUserDto): Promise<UserDto> {
    const user = await this.userService.create(input);
    return this.userToDtoFormat(user);
  }

  @Put(':userId')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(@Param('userId') userId: number, @Body() input: UpdateUserDto): Promise<UserDto> {
    const user = await this.userService.update(userId, input);
    return this.userToDtoFormat(user);
  }

  @Delete(':userId')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  async delete(@Param('userId') userId: number): Promise<boolean> {
    return this.userService.delete(userId);
  }

  @Post('/buy')
  @UseGuards(AuthGuard())
  async buy(@Req() req, @Body('bookId') bookId: number) {
    return this.userService.buy(req.user.userId, bookId);
  }

  private userToDtoFormat(user: User): UserDto {
    return {
      balance: user.balance,
      userId: user.userId,
      role: user.role
    };
  }
}
