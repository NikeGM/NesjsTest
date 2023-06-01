import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto, User } from './user.interface';

@Injectable()
export class UserService {
  private bcrypt: any;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByNickname(nickname: string): Promise<User> {
    return this.userRepository.findOne({ where: { nickname } });
  }

  async create(input: CreateUserDto): Promise<User> {
    const hashedPassword = await this.bcrypt.hash(input.password, 10);
    const newUser = this.userRepository.create({
      ...input,
      passwordHash: hashedPassword
    });

    return this.userRepository.save(newUser);
  }

  async update(id: number, input: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (user) {
      const updatedUser = this.userRepository.merge(user, input);
      return this.userRepository.save(updatedUser);
    }
    return null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected > 0;
  }
}
