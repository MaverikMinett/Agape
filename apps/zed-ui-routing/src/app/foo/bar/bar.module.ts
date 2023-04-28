import { Module } from "../../../lib/decorators/module";


import { BarComponent } from "./bar.component";




@Module({
    declares: [ BarComponent ],
    exports: [ BarComponent ]
})
export class BarModule {

}