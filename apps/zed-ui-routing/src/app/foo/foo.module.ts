import { Module } from "../../lib/decorators/module";


import { BarComponent } from "./bar.component";
import { FooComponent } from "./foo.component";



@Module({
    declares: [ FooComponent, BarComponent ],
    exports: [ FooComponent, BarComponent ]
})
export class FooModule {

}