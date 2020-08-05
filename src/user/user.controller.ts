import { Controller, Get, Post, HttpCode, Param, Body, Put, Delete, Res, NotFoundException } from '@nestjs/common';
import { PostUserDto } from './dto/post-user.dto';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { UpdateResult } from 'typeorm';
import { PutUserDto } from './dto/put-user.dto';

@Controller('api/v1/user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<Array<User>> {
    return await this.userService.getAll();
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<User> {
    const user = await this.userService.get(id);
    if (!user) throw new NotFoundException('User Not Found')
    return user;
  }

  @Post()
  async post(@Body() userDto: PostUserDto): Promise<User> {
    return this.userService.post(userDto);
  }

  @Put()
  async put(@Body() userDto: PutUserDto): Promise<User> {
    return this.userService.put(userDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.userService.delete(id);
  }

}
