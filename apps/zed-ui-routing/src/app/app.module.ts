
import { Module } from "../lib/decorators/module";
import { RouterModule } from "../lib/modules/router/router.module";
import { AppComponent } from "./app.component";
import { FooModule } from "./foo/foo.module";



@Module({
    declares: [ AppComponent ],
    bootstrap: AppComponent,
    imports: [ 
        FooModule,
        RouterModule
    ]
})
export class AppModule {

}