import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '../common';
import { HttpModule } from '@nestjs/axios';
import * as providers from './providers';
@Module({
  imports: [ConfigModule, CommonModule, HttpModule],
  providers: Object.values(providers),
  exports: Object.values(providers)
})
export class SharedModule {}
