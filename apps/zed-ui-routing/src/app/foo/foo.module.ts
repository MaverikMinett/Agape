import { Module } from "../../lib/decorators/module";
import { BarModule } from "./bar/bar.module";



import { FooComponent } from "./foo.component";



@Module({
    imports: [ BarModule ],
    declares: [ FooComponent ],
    exports: [ FooComponent ]
})
export class FooModule {

}