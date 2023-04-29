import { Class } from "@agape/types";
// import { ApplicationContext } from "../../application-context.interface";
import { RouteDefinition } from "./route-definition.interface";
import { Service } from "../../decorators/service";

// export interface RouteDeclaration {

// }

@Service({providedIn: 'root'})
export class Router {

    routes: RouteDefinition[] = []

    constructor (  ) {

    }

    navigate( to: string ) {
        console.log(`Navigating to` + to )
        history.pushState(null, null, to);
        const route = this.findMatchingRoute( this.routes, to )
        console.log("Found matching route", route )
        // this.app.changeComponentBecauseOfRouter(route.component)
    }

    findMatchingRoute( routes: RouteDefinition[], path: string ) {
        path = path.substring(1)
        const route = routes.find( r => r.path === path )
        return route
    }

    addRoutes( module: Class, routes: RouteDefinition[] ) {
        this.routes.push(...routes)
    }

}