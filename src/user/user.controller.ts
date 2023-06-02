import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, User, UserDto, UserRole } from './user.interface';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../role/role.guard';
import { Roles } from '../role/role.decorator';
import { UserAccessGuard } from './user-access.guard';

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

  @Get(':id')
  @UseGuards(AuthGuard(), UserAccessGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async findOne(@Param('id') id: number): Promise<UserDto> {
    const user = await this.userService.findById(id);
    return this.userToDtoFormat(user);
  }

  @Post()
  async create(@Body() input: CreateUserDto): Promise<UserDto> {
    const user = await this.userService.create(input);
    return this.userToDtoFormat(user);
  }

  @Put(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: number, @Body() input: UpdateUserDto): Promise<UserDto> {
    const user = await this.userService.update(id, input);
    return this.userToDtoFormat(user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  async delete(@Param('id') id: number): Promise<boolean> {
    return this.userService.delete(id);
  }

  @Post('/buy')
  @UseGuards(AuthGuard())
  async buy(@Req() req, @Body('bookId') bookId: number) {
    return this.userService.buy(req.user.id, bookId);
  }

  private userToDtoFormat(user: User): UserDto {
    return {
      balance: user.balance,
      id: user.id,
      role: user.role
    };
  }
}
