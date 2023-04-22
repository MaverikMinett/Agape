import { Module } from "apps/eserver/src/lib/decorators";
import { EventsController } from "./events.controller";



@Module({
    'controllers': [ EventsController ]
})
export class EventsModule {

}
