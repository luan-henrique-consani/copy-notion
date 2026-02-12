import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('boards')
@UseGuards(AuthGuard('jwt'))
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: any, @Request() req: any) {
    const userId = req.user.userId;
    return this.boardsService.create(createBoardDto, userId);
  }

  @Get()
  findAll(@Request() req: any) {
    const userId= req.user.userId
    return this.boardsService.findAll(userId);
  }

}
