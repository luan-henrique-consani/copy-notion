import { Controller, Get, Post, Body, Patch, Delete, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('cadastro')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async validateUser(@Body() loginDto: LoginDto){
    const user = await this.usersService.validateUser(loginDto.email, loginDto.password)

    if(!user){
      throw new UnauthorizedException('Email ou senha inválidos')
    }

    return user
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req){
    return req.user;
  }
}
