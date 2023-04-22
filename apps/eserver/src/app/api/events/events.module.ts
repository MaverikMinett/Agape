import { Module } from "@lib/api";
import { EventsController } from "./events.controller";



@Module({
    'controllers': [ EventsController ]
})
export class EventsModule {

}
