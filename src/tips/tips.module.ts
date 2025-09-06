import { Module } from '@nestjs/common';
import { TipsController } from './tips.controller';
import { TipsService } from './tips.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [TipsController],
  providers: [TipsService, ConfigService],
})
export class TipsModule {}
