
import { Module } from "../lib/decorators/module";
import { RouterModule } from "../lib/modules/router/router.module";
import { AppComponent } from "./app.component";
import { BooComponent } from "./boo.component";
import { EventsModule } from "./events/events.module";
import { FooModule } from "./foo/foo.module";


const routes = [
    { path: 'boo', component: BooComponent }
]


@Module({
    declares: [ AppComponent, BooComponent ],
    bootstrap: AppComponent,
    imports: [ 
        FooModule,
        EventsModule,
        RouterModule.forRoot(routes)
    ]
})
export class AppModule {

}