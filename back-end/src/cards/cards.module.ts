import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { PrismaService } from 'src/prisma.service';
import { EventsGateway } from 'src/events/events.gateway';

@Module({
  controllers: [CardsController],
  providers: [CardsService, PrismaService, EventsGateway],
})
export class CardsModule {}
