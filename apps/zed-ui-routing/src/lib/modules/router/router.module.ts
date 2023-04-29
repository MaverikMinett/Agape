import { Module } from "../../decorators/module";
import { ModuleContext } from "../../module-container";
import { RouteDefinition } from "./route-definition.interface";
import { Router } from "./router";
import { RouterOutletComponent } from "./router-outlet.component";


@Module({
    declares: [ RouterOutletComponent ],
    exports: [ RouterOutletComponent ],
    provides: [ Router ]
})
export class RouterModule {

    // constructor( callingModuleContext: ModuleContext ) {

    // }


    static forRoot( routes: RouteDefinition[] ) {


        return {
            module: RouterModule,
            routes
        }
    }

}

