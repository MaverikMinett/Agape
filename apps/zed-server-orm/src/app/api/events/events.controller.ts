import { Controller, Delete, Get, Post, Put, Body, Params } from "@agape/api";
import { EventService } from "./event.service";
// import { IEvent } from "../../interfaces/IEvents";
import { Exception } from "@agape/exception";

import { Event } from 'lib-platform'
import { Interface } from "@agape/types";

@Controller('events')
export class EventsController {

    constructor( public service: EventService ) {
        
    }

    @Get()
    async list() {
        return this.service.list()
    }

    @Post()
    async create( @Body item: Event ) {
        return this.service.create( item )
    }

    @Get(':id')
    async retrieve( @Params params: any ) {
        const { id } = params
        const item = await this.service.retrieve(id)
        if ( ! item ) {
            throw new Exception(404)
        }

        return item
    }

    @Put(':id')
    async update( @Params params: any, @Body item: Event ) {
        const { id } = params
        return this.service.update(id, item)
    }

    @Delete(':id')
    async delete( @Params params: any ) {
        const { id } = params
        return this.service.delete(id)
    }

}