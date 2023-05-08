import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { EventService } from './event.service';
// import { IEvent } from './interfaces';
import { Event } from './event.model'
import { Interface } from '@agape/types';
import { time } from 'console';

@Controller('api/events')
export class EventsController {
  constructor(private readonly service: EventService) {}


    @Get()
    async list() {
        const events = await this.service.list()
        for ( let event of events ) {
            const _event: any = event
            _event.timeStart = event.timeStart?.toISOString()
            _event.timeStart = event.timeEnd?.toISOString()
        }
        return events
    }

    @Post()
    create( @Body() payload: Interface<Event> ) {
        const timeStart = new Date(payload.timeStart)
        const timeEnd = payload.timeEnd ? new Date(payload.timeEnd) : undefined
        const _payload:any = payload
        payload.timeStart = timeStart
        payload.timeEnd = timeEnd
        return this.service.create( _payload )
    }

    @Get(':id')
    async retrieve( @Param('id') id: string ) {
        const event = await this.service.retrieve(id)
        const _event: any = event
        _event.timeStart = event.timeStart?.toISOString()
        _event.timeEnd = event.timeEnd ? event.timeEnd.toISOString() : undefined
        return event
    }

    @Put(':id')
    update( @Param('id') id: string, @Body() payload: Interface<Event>) {
        const timeStart = new Date(payload.timeStart)
        const timeEnd = payload.timeEnd ? new Date(payload.timeEnd) : undefined
        const _payload:any = payload
        payload.timeStart = timeStart
        payload.timeEnd = timeEnd
        this.service.update(id, payload)
    }

    @Delete(':id')
    delete( @Param('id') id: string ) {
        this.service.delete(id)
    }


}
