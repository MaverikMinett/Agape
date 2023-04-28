import { Module } from "../../decorators/module";
import { RouteDefinition } from "./route-definition.interface";
import { RouterOutletComponent } from "./router-outlet.component";


@Module({
    declares: [ RouterOutletComponent ],
    exports: [ RouterOutletComponent ]
})
export class RouterModule {


    static forRoot( routes: RouteDefinition[] ) {
        console.log("Calling for route")
        return {
            module: RouterModule,
            routes
        }
    }

}

