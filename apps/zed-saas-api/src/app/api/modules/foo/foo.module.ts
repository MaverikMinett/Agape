import { Module } from "@agape/api";
import { FooController } from "./foo.controller";


@Module({
    controllers: [FooController]
})
export class FooModule {

}