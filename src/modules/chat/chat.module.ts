import { Module } from '@nestjs/common';
import * as providers from './providers';
import * as controllers from './controllers';
import * as entities from './entities';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature(Object.values(entities))],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
  exports: Object.values(providers),
})
export class ChatModule {}
