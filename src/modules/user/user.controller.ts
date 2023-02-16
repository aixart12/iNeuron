import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  getAllUser() {
    return this.userService.getAll();
  }

  @Post('/')
  createUser(@Body() user: UsersDto) {
    return this.userService.create(user);
  }

  @Put('/:userId')
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() user: UsersDto,
  ) {
    return this.userService.updateUser(userId, user);
  }
  @Delete('/:userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.deleteUserById(userId);
  }
}
