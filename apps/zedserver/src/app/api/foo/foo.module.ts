import { Module } from "@lib/api";
import { FooController } from "./foo.controller";


@Module({
    'controllers': [ FooController ]
})
export class FooModule {

}
