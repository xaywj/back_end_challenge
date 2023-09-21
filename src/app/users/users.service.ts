import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOneBy({
      username: createUserDto.username,
    });
    if (user) {
      throw new NotFoundException('Username already exists');
    }
    return await this.usersRepository.save({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      username: createUserDto.username,
      password: await bcrypt.hash(createUserDto.password, 10),
      isActive: createUserDto.isActive,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneBy({ id: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id: id });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    await this.usersRepository.update(id, {
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      username: updateUserDto.username,
      password: bcrypt.hashSync(updateUserDto.password, 10),
      isActive: updateUserDto.isActive,
      updated_at: new Date(),
    });
    return await this.usersRepository.findOneBy({ id: id });
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneBy({ id: id });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    await this.usersRepository.delete(id);
    return { message: 'User updated successfully' };
  }

  async findusername(username: string) {
    return await this.usersRepository.findOneBy({ username: username });
  }
}
