import { Module } from "@agape/api";
import { FooModule } from "./foo/foo.module";
import { EventsModule } from "./events/events.module";

@Module({
    'modules': [ FooModule, EventsModule ]
})
export class ApiModule {

}