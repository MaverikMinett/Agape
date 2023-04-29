import { RouteDefinition } from "./route-definition.interface";
import { Service } from "../../decorators/service";
import { ModuleContext } from "../../module-container";
import { Subject } from 'rxjs'
import { ModuleComponentContext } from '../../module-container'
import { ApplicationContext } from "../../application-context";


export interface ContextualizedRouteDefinition {
    routeDefinition: RouteDefinition
    moduleContext: ModuleContext<any>
}

@Service({providedIn: 'root'})
export class Router {

    routes: ContextualizedRouteDefinition[] = []

    constructor ( applicationContext: ApplicationContext ) {
        applicationContext.ready().subscribe( 
            () => {
                const currentLocation = window.location.pathname 
                this.navigate(currentLocation)
            }
        )
    }

    navigateSubject = new Subject<ModuleComponentContext>()

    // initialize() {
    //     const currentLocation = window.location.pathname 
    //     this.navigate(currentLocation)
    //     console.log(currentLocation)
    // }

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
        path = path.substring(1) // TODO: Handle paths that aren't prefixed with /
        const route = routes.find( r => r.routeDefinition.path === path )
        return route
    }

    addRoutes( moduleContext: ModuleContext<any>, routes: RouteDefinition[] ) {
        const contextualizedRouteDefinitions = routes.map( r => ({routeDefinition: r, moduleContext}) )
        this.routes.push(...contextualizedRouteDefinitions)

        console.log("Router with ROUTES",this)
    }



}