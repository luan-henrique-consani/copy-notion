import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: { origin: '*' },
})

export class EventsGateway implements OnGatewayConnection{
    @WebSocketServer()

    server: Server;

    handleConnection(client: Socket) {
        console.log(`Cliente conectado: ${client.id}`);
    }

    emitBoardUpdate(boardId: number){
        this.server.emit(`board-${boardId}-updated`);
    }
}
