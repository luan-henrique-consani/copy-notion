import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from 'src/prisma.service';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class ListsService {
  constructor(private prisma: PrismaService, private eventsgateway: EventsGateway) {}

  async create(createListDto: CreateListDto) {
    const position = createListDto.position ?? await this.prisma.list.count({
      where: { boardId: createListDto.boardId },
    });

    const newList = await this.prisma.list.create({
      data: {
        ...createListDto,
        position: position
      },
    });

    this.eventsgateway.emitBoardUpdate(createListDto.boardId);

    return newList;
  }

  findAll() {
    return `This action returns all lists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} list`;
  }

  async update(id: number, updateListDto: UpdateListDto) {
    const list = await this.prisma.list.update({
      where: { id },
      data: updateListDto,
    });

    this.eventsgateway.emitBoardUpdate(id);

    return list;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
