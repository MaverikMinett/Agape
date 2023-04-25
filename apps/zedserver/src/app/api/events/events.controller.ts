import { Controller, Delete, Get, Post, Put } from "@agape/api";
import { EventService } from "./event.service";

@Controller()
export class EventsController {

    constructor( public service: EventService ) {

    }

    @Get('events')
    async list( body: any, params: any ) {
        return this.service.list()
    }

    @Post('events')
    async create( body: any, params: any ) {
        const payload = body  // TODO: should be injecting and validating this
        this.service.create(payload)
    }

    @Get('events/:id')
    async retrieve( body: any, params: any  ) {
        const { id } = params
        const event = this.service.retrieve(id)
        return event
    }

    @Put('events/:id')
    async update( body: any, params: any  ) {
        const { id } = params
        
        const payload = body  // TODO: should be injecting and validating this
        
        this.service.update(id, payload)
    }

    @Delete('events/:id')
    async delete( body: any, params: any  ) {
        const { id } = params
        this.service.delete(id)

    }
}