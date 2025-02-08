import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { WhatsappModule } from '../whatsapp/whatsapp.module';
import { MediaModule } from '../media/media.module';

@Module({
  imports: [WhatsappModule, MediaModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
