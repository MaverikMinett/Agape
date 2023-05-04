import { Module } from "../../decorators/module";
import { RouteDefinition } from "./route-definition.interface";
import { Router } from "./router";
import { RouterOutletComponent } from "./router-outlet.component";


@Module({
    declares: [ RouterOutletComponent ],
    exports: [ RouterOutletComponent ],
    provides: [ Router ]
})
export class RouterModule {


    static forRoot( routes: RouteDefinition[] ) {
        return {
            module: RouterModule,
            routes
        }
    }

}

