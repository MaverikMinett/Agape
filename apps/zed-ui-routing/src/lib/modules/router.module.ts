import { Module } from "../decorators/module";
import { RouteDefinition } from "./route-definition.interface";


@Module()
export class RouterModule {


    static forRoot( routes: RouteDefinition[] ) {
        console.log("Calling for route")
        return {
            module: RouterModule,
            routes
        }
    }

}

