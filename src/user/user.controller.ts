import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, User, UserDto } from './user.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<UserDto[]> {
    const users = await this.userService.findAll();
    return users.map(this.userToDtoFormat);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: number): Promise<UserDto> {
    const user = await this.userService.findById(id);
    return this.userToDtoFormat(user);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() input: CreateUserDto): Promise<UserDto> {
    const user = await this.userService.create(input);
    return this.userToDtoFormat(user);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: number, @Body() input: UpdateUserDto): Promise<UserDto> {
    const user = await this.userService.update(id, input);
    return this.userToDtoFormat(user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: number): Promise<boolean> {
    return this.userService.delete(id);
  }

  private userToDtoFormat(user: User): UserDto {
    return {
      balance: user.balance,
      id: user.id,
      role: user.role
    };
  }
}
