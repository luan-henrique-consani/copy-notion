import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { ListsModule } from './lists/lists.module';
import { CardsModule } from './cards/cards.module';
import { CardsModule } from './cards/cards.module';
import { ListsModule } from './lists/lists.module';

@Module({
  imports: [UsersModule, BoardsModule, ListsModule, CardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
