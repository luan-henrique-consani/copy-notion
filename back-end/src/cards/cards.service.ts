import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { PrismaService } from 'src/prisma.service';
import { EventsGateway } from 'src/events/events.gateway';


@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService, private eventsgateway: EventsGateway) { }

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
      select: { id: true }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  async update(id: number, updateCardDto: any) {
    const { position, listId } = updateCardDto;

    const currentCard = await this.prisma.card.findUnique({ where: { id } });
    if (!currentCard) throw new NotFoundException('Card não encontrado');

    return this.prisma.$transaction(async (tx) => {

      if (listId && listId !== currentCard.listId) {
        await tx.card.updateMany({
          where: { listId: listId, position: { gte: position } },
          data: { position: { increment: 1 } },
        });

        await tx.card.updateMany({
          where: { listId: currentCard.listId, position: { gt: currentCard.position } },
          data: { position: { decrement: 1 } },
        })
      }

      else if (position !== undefined && position !== currentCard.position) {
        if (position < currentCard.position) {
          await tx.card.updateMany({
            where: {
              listId: currentCard.listId,
              position: { gte: position, lt: currentCard.position },
            },
            data: { position: { increment: 1 } },
          });
        } else {
          await tx.card.updateMany({
            where: {
              listId: currentCard.listId,
              position: { gt: currentCard.position, lte: position },
            },
            data: { position: { decrement: 1 } },
          });
        }
      }
      const updateCard = tx.card.update({
        where: { id },
        data: updateCardDto,
      });

      const list = await this.prisma.list.findUnique({ where: { id: (await updateCard).listId } });
      if (!list) {
        throw new NotFoundException('Lista não encontrada para este card');
      }
      this.eventsgateway.emitBoardUpdate((list.boardId));

      return updateCard;
    });
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
