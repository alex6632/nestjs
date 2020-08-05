import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { UserInterface } from './interfaces/user.interface';
import { PostUserDto } from './dto/post-user.dto';
import { PutUserDto } from './dto/put-user.dto';

@Injectable()
export class UserService implements UserInterface {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async getAll(): Promise<Array<User>> {
    return await this.userRepository.find();
  }

  async get(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async post(userDto: PostUserDto): Promise<User> {
    if (userDto.firstName === undefined || userDto.firstName.length === 0) {
      throw new HttpException('Le prénom est obligatoire', HttpStatus.NO_CONTENT);
    }
    if (userDto.lastName === undefined || userDto.lastName.length === 0) {
      throw new HttpException('Le nom de famille est obligatoire', HttpStatus.NO_CONTENT);
    }
    const user = new User();
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;

    if (userDto.age !== undefined) {
      if (typeof userDto.age !== 'number') {
        throw new HttpException('L\'âge doit être un entier numérique', HttpStatus.NOT_ACCEPTABLE);
      }
      user.age = userDto.age;
    }
    user.age = userDto.age;

    return await this.userRepository.save(user);
  }

  async put(userDto: PutUserDto): Promise<User> {
    const userToUpdate = await this.userRepository.findOne(userDto.id);
    
    if (userToUpdate === undefined) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    let updated = Object.assign(userToUpdate, userDto);

    return await this.userRepository.save(updated);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
