import { Controller, Get, Post } from "@agape/api";
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
        console.log("Params", params, body)
        const { id } = params
        return this.service.retrieve(id)
    }

}