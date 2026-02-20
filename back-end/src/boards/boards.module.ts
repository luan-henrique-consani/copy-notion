import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { PrismaService } from 'src/prisma.service';
import { EventsGateway } from 'src/events/events.gateway';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService, PrismaService, EventsGateway],
})
export class BoardsModule {}
