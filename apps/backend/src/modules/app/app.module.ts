import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionModule } from '../subscription/subscription.module';
import { GreenApiModule } from '../green-api/green-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SubscriptionModule,
    GreenApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
