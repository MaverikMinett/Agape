import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from 'lib-platform'
import { Interface } from '@agape/types';


import { alchemy } from '@agape/alchemy'
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/events')
export class EventsController {
  constructor(private readonly service: EventService) {}


    @Get()
    @UseGuards(AuthGuard)
    async list() {
        const events = await this.service.list()

        const deflated = alchemy.deflate(Event, events)

        return deflated
    }

    @Post()
    @UseGuards(AuthGuard)
    create( @Body() payload: Interface<Event> ) {

        const event = alchemy.inflate(Event, payload)

        return this.service.create( event )
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async retrieve( @Param('id') id: string ) {

        const event = await this.service.retrieve(id)

        if ( ! event ) {
            throw new NotFoundException()
        }

        const dto = alchemy.deflate(Event, event)

        return dto
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    update( @Param('id') id: string, @Body() payload: Interface<Event>) {

        const event = alchemy.inflate(Event, payload)

        this.service.update(id, event)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    delete( @Param('id') id: string ) {
        this.service.delete(id)
    }


}
