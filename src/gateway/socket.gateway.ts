import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SendMessageInput } from '../modules/chat/dto';
import { MessageService } from '../modules/chat/providers';
import { ContextService } from '../shared/providers';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  constructor(
    private readonly messageService: MessageService,
    private readonly contextService: ContextService,
  ) {}
  private readonly logger: Logger = new Logger();

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: SendMessageInput,
  ): Promise<void> {
    const userId = this.contextService.getUserFromHeader(
      client.handshake.headers['authorization'],
    );
    console.log('userId', userId);
    await this.messageService.sendMessage(userId, payload);
    this.server.emit('response_message', payload);
  }

  afterInit(server: Server) {
    this.logger.log(server);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id} ... ${args}`);
  }
}
