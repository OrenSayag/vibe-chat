import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionModule } from '../subscription/subscription.module';
import { EventsModule } from '../events/events.module';
import { WorkspaceModule } from '../workspace/workspace.module';
import { WhatsappModule } from '../whatsapp/whatsapp.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SubscriptionModule,
    EventsModule,
    WorkspaceModule,
    WhatsappModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
