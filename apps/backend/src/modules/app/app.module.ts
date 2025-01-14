import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionModule } from '../subscription/subscription.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SubscriptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
