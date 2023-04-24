import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { IEvent } from './interfaces';

@Controller('api/events')
export class EventsController {
  constructor(private readonly service: EventService) {}


    @Get()
    list() {
        return this.service.list()
    }

    @Post()
    create( @Body() payload: IEvent ) {
        this.service.create( payload )
    }

    @Get(':id')
    retrieve( @Param('id') id: string ) {
        const event = this.service.retrieve(id)
        return event
    }

    @Put(':id')
    update( @Param('id') id: string, @Body() payload: IEvent) {
        this.service.update(id, payload)
    }

    @Delete(':id')
    delete( @Param('id') id: string ) {
        this.service.delete(id)
    }


}
