import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [EventsService, EventsGateway],
  exports: [EventsService],
})
export class EventsModule {}
