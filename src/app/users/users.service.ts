import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
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
    return await this.usersRepository.save(createUserDto);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneBy({ id: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);     
   await this.usersRepository.update(id, {
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      username: updateUserDto.username,
      password: updateUserDto.password,
      isActive: updateUserDto.isActive,
    });
    return await this.usersRepository.findOneBy({ id: id
   });
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
}
