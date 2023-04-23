import { Controller, Delete, Get, Post, Put, ApiRequest, ApiResponse } from "@lib/api";
import { EventService } from "./event.service";

@Controller()
export class EventsController {

    constructor( public service: EventService ) {

    }

    @Get('events')
    async list( request: ApiRequest, response: ApiResponse ) {
        return this.service.list()
    }

    @Post('events')
    async create( request: ApiRequest, response: ApiResponse ) {
        const payload = request.body  // TODO: should be injecting and validating this
        this.service.create(payload)
    }

    @Get('events/:id')
    async retrieve( request: ApiRequest, response: ApiResponse ) {
        const { id } = request.params
        const event = this.service.retrieve(id)
        return event
    }

    @Put('events/:id')
    async update( request: ApiRequest, response: ApiResponse ) {
        const { id } = request.params
        
        const payload = request.body  // TODO: should be injecting and validating this
        
        this.service.update(id, payload)
    }

    @Delete('events/:id')
    async delete( request: ApiRequest, response: ApiResponse ) {
        const { id } = request.params
        this.service.delete(id)

    }
}