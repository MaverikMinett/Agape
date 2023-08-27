import { Controller, Delete, Get, Post, Put, Body } from "@agape/api";
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
    async retrieve(params: {id: string}, body: any ) {
        const { id } = params
        const item = await this.service.retrieve(id)
        if ( ! item ) {
            throw new Exception(404)
        }

        return item
    }

    @Put(':id')
    async update(params: {id: string}, body: any ) {
        const { id } = params
        return this.service.update(id, body)
    }

    @Delete(':id')
    async delete(params: {id: string}, body: any ) {
        const { id } = params
        return this.service.delete(id)
    }

}