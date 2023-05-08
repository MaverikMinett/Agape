import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventService } from './event.service';

@Module({
  imports: [],
  controllers: [EventsController],
  providers: [EventService],
})
export class EventsModule {}
