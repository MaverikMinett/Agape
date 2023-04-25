import { Controller, Delete, Get, Post, Put } from "@agape/api";
import { EventService } from "./event.service";
import { IEvent } from "../../interfaces/IEvents";



@Controller('events')
export class EventsController {

    constructor( public service: EventService ) {
        
    }

    @Get()
    list() {
        return this.service.list()
    }

    @Post()
    create( params: any, body: IEvent ) {
        return this.service.create( body )
    }

    @Get(':id')
    retrieve(params: {id: string}, body: any ) {
        const { id } = params
        return this.service.retrieve(id)
    }

    @Put(':id')
    update(params: {id: string}, body: any ) {
        const { id } = params
        return this.service.update(id, body)
    }

    @Delete(':id')
    delete(params: {id: string}, body: any ) {
        const { id } = params
        return this.service.retrieve(id)
    }

}