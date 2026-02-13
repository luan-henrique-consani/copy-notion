import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  async create(createCardDto: CreateCardDto) {
    const position = createCardDto.position ?? await this.prisma.card.count({
      where: { listId: createCardDto.listId }
    });
    return this.prisma.card.create({
      data: {
        ...createCardDto,
        position: position
      },
    });
  }

  findAll() {
    return this.prisma.card.findMany({
      select: { id:true }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    return this.prisma.card.update({
      where: { id },
      data: {
        title: updateCardDto.title,
        description: updateCardDto.description,
        position: updateCardDto.position,
        listId: updateCardDto.listId
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
