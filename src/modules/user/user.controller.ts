import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UsersDto } from "./dto/user.dto";
import { UserService } from "./user.service";

@ApiTags('User')
@Controller('user')
export class UserController{
  constructor(private readonly userService : UserService){}

  @Get('/')
  getAllUser(){
    return this.userService.getAll()   
  }

  @Post('/')
  createUser(@Body() user :UsersDto){
    return this.userService.create(user)
  }

  @Put('/')
  updateUser(@Body() id : number){
    return this.userService.updateUser(id)
  }
  @Delete('/')
  deleteUser(@Body() id : number){
    return this.userService.deleteUserById(id)
  }
}