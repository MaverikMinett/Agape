import { Controller, Get } from "@agape/api";
import { EventService } from "./event.service";



@Controller('events')
export class EventsController {

    public service: EventService = new EventService()

    @Get()
    list() {
        return this.service.list()
    }

}