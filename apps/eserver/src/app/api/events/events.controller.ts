import { Controller, Delete, Get, Post, Put, ApiRequest, ApiResponse } from "@lib/api";
import { Exception } from '@lib/exception'
import { events } from './events.model'

import { v4 } from 'uuid';

@Controller()
export class EventsController {


    @Get('events')
    async list( request: ApiRequest, response: ApiResponse ) {
        return events
    }

    @Get('events/:id')
    async retrieve( request: ApiRequest, response: ApiResponse ) {
        const { id } = request.params
        const event = events.find( e => e.id === id )

        if ( ! event ) throw new Exception(404, "Could not find event with that ID")
        
        return event
    }

    @Post('events')
    async create( request: ApiRequest, response: ApiResponse ) {
        const payload = request.body  // TODO: should be injecting and validating this
        const event = payload
        event.id = v4()

        events.push(event)

        // TODO: this.service.create(payload)
    }

    @Put('events/:id')
    async update( request: ApiRequest, response: ApiResponse ) {
        const { id } = request.params
        
        const payload = request.body  // TODO: should be injecting and validating this
        const event = payload
        event.id = id

        const index = events.findIndex( e => e.id === id )
        
        if ( ! index ) throw new Exception(404, "Could not find event with that ID")

        events.splice(index,1,event)

        // TODO: this.service.update(id, payload)
    }

    @Delete('events/:id')
    async delete( request: ApiRequest, response: ApiResponse ) {
        const { id } = request.params
        const index = events.findIndex( e => e.id === id )

        if ( ! index ) throw new Exception(404, "Could not find event with that ID.")
        
        events.splice(index,1)
    }
}