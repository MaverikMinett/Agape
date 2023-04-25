import { Module } from "@agape/api";
import { EventsController } from "./events.controller";


@Module({
    controllers: [ EventsController ]
})
export class EventsModule { }