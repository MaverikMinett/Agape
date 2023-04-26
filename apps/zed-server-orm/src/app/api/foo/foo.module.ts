import { Module } from "@agape/api";
import { FooController } from "./foo.component";


@Module({
    controllers: [FooController]
})
export class FooModule {

}