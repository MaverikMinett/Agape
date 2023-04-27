import { Module } from "../../lib/decorators/module";
import { FooComponent } from "./foo.component";



@Module({
    components: [ FooComponent ]
})
export class FooModule {

}