import { Module } from "apps/eserver/src/lib/decorators";
import { FooController } from "./foo.controller";


@Module({
    'controllers': [ FooController ]
})
export class FooModule {

}
