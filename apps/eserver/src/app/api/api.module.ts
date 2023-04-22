import { Module } from "apps/eserver/src/lib/decorators";
import { FooModule } from "./foo/foo.module";
import { EventsModule } from "./events/events.module";

@Module({
    'modules': [ FooModule, EventsModule ]
})
export class ApiModule {

}
