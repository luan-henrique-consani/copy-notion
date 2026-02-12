import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) {}

  async create(createBoardDto: any, userId: number) {
    return this.prisma.board.create({
      data: {
        title: createBoardDto.title,
        ownerId: userId
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.board.findMany({
      where: {
        ownerId: userId,
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
