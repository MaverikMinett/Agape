import { Controller, Get, Post } from "@agape/api";
import { EventService } from "./event.service";
import { IEvent } from "../../interfaces/IEvents";



@Controller('events')
export class EventsController {

    public service: EventService = new EventService()

    @Get()
    list() {
        return this.service.list()
    }

    @Post()
    create( params: any, body: IEvent ) {
        return this.service.create( body )
    }

}