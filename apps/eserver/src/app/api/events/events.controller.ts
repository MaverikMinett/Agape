import { ApiRequest } from "apps/eserver/src/lib/api-request";
import { ApiResponse } from "apps/eserver/src/lib/api-response";
import { Controller, Get } from "apps/eserver/src/lib/decorators";

import { events } from './events.model'

@Controller()
export class EventsController {


    @Get('events')
    async list( request: ApiRequest, response: ApiResponse ) {
        return events
    }

}