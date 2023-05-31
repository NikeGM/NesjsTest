import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, User } from './user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Post()
  async create(@Body() input: CreateUserDto): Promise<User> {
    return this.userService.create(input);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() input: UpdateUserDto): Promise<User> {
    return this.userService.update(id, input);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<boolean> {
    return this.userService.delete(id);
  }
}
