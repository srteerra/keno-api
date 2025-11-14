import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TipsModule } from './tips/tips.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TipsModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
