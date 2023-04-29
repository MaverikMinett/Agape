import { Class } from "@agape/types";
// import { ApplicationContext } from "../../application-context.interface";
import { RouteDefinition } from "./route-definition.interface";
import { Service } from "../../decorators/service";
import { ModuleContext } from "../../module-container";
import { Subject } from 'rxjs'
import { ModuleComponentContext } from '../../module-container'

// export interface RouteDeclaration {

// }

export interface ContextualizedRouteDefinition {
    routeDefinition: RouteDefinition
    moduleContext: ModuleContext<any>
}

@Service({providedIn: 'root'})
export class Router {

    routes: ContextualizedRouteDefinition[] = []

    constructor (  ) {
        console.log("CONSTRUCTING ROUTER")
    }

    navigateSubject = new Subject<ModuleComponentContext>()

    navigate( to: string ) {
        console.log(`Navigating to` + to )
        history.pushState(null, null, to);

        const route = this.findMatchingRoute( this.routes, to )

        const moduleComponentContext: ModuleComponentContext = {
            moduleContext: route.moduleContext,
            component: route.routeDefinition.component
        }

        this.navigateSubject.next(moduleComponentContext)

    }

    onNavigateToComponent() {
        return this.navigateSubject.asObservable()
    }

    findMatchingRoute( routes: ContextualizedRouteDefinition[], path: string ) {
        path = path.substring(1)
        const route = routes.find( r => r.routeDefinition.path )
        return route
    }

    addRoutes( moduleContext: ModuleContext<any>, routes: RouteDefinition[] ) {
        const contextualizedRouteDefinitions = routes.map( r => ({routeDefinition: r, moduleContext}) )
        this.routes.push(...contextualizedRouteDefinitions)

        console.log("Router with ROUTES",this)
    }



}