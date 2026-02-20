import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { PrismaService } from 'src/prisma.service';
import { EventsGateway } from 'src/events/events.gateway';

@Module({
  controllers: [ListsController],
  providers: [ListsService, PrismaService, EventsGateway],
})
export class ListsModule {}
