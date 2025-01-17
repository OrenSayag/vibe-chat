import { Module } from '@nestjs/common';
import { GreenApiController } from './green-api.controller';
import { GreenApiService } from './green-api.service';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [EventsModule],
  controllers: [GreenApiController],
  providers: [GreenApiService],
  exports: [GreenApiService],
})
export class GreenApiModule {}
