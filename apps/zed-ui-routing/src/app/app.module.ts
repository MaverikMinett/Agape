import { Module } from "../lib/decorators/module";
import { RouterModule } from "../lib/modules/router.module";
import { AppComponent } from "./app.component";
import { FooComponent } from "./foo/foo.component";


const routes = [
    { path: 'foo', component: FooComponent }
]

@Module({
    components: [ AppComponent ],
    bootstrap: AppComponent,
    imports: [ 
        RouterModule.forRoot(routes)
    ]
})
export class AppModule {

}