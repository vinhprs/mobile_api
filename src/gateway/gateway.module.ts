import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from '../modules/chat/chat.module';
import { SharedModule } from '../shared/share.module';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [ChatModule, SharedModule, ConfigModule],
  providers: [SocketGateway],
})
export class GatewayModule {}
