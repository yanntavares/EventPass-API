import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiDocCreateUser,
  ApiDocDeleteUser,
  ApiDocFindAllUsers,
  ApiDocFindUserById,
  ApiDocFindUsersEvents,
  ApiDocUpdateUser,
} from './user.swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiDocCreateUser()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiDocFindAllUsers()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiDocFindUserById()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiDocUpdateUser()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiDocDeleteUser()
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Get(':id/events')
  @ApiDocFindUsersEvents()
  findUsersEvents(@Param('id') id: string) {
    return this.userService.findUsersEvents(id);
  }
}
