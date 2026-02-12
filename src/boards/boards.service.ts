import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PrismaService } from 'src/prisma.service';
import { CardsService } from '../cards/cards.service';

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

  async findOne(id: number, userId: number) {
    const board = await this.prisma.board.findUnique({
      where:{ id },
        include: {
          lists: {
            orderBy: { position: 'asc'},
            include: {
              cards: {
                orderBy: { position: 'asc'},
              },
            },
          },
        },
    });

    if(!board ||  board.ownerId !== userId){
      throw new UnauthorizedException('Board não encontrado ou acesso negado!');
    }
    return board;

  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  async remove(id: number, userId: number) {
    const board = await this.prisma.board.delete({
      where: { id }
    });

    if(!board ||  board.ownerId !== userId){
      throw new UnauthorizedException('Você não tem autorização para apagar esse board!');
    }
    return board;
  }
}
