import { Module } from "../lib/decorators/module";
import { RouterModule } from "../lib/modules/router/router.module";
import { AppComponent } from "./app.component";
import { BarComponent } from "./bar.component";
import { FooComponent } from "./foo.component";


const routes = [
    { path: 'foo', component: FooComponent }
]

@Module({
    declares: [ AppComponent, FooComponent, BarComponent ],
    bootstrap: AppComponent,
    imports: [ 
        RouterModule.forRoot(routes)
    ]
})
export class AppModule {

}