import { Module } from '@nestjs/common';
import * as providers from './providers';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission, Role, User } from './entities';
import { UserService } from './providers';
import { CommonModule } from 'src/common';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([User, Permission, Role])],
  controllers: [UserController],
  providers: Object.values(providers),
  exports: [UserService],
})
export class UserModule {}
