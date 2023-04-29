import { Class } from "@agape/types";
import { ComponentHarness } from "./component-harness";
import { Module } from "./decorators/module";
import { ApplicationContext } from "./application-context.interface";
import { Router } from "./modules/router/router";
import { RouteDefinition } from "./modules/router/route-definition.interface";
import { Injector } from "./injector";


class ModuleContext {
    module: Class;
    injector: Injector;
}

export class App implements ApplicationContext {

    // router: Router = new Router( this )

    // injector = new Injector()

    constructor( public element: HTMLElement, public module?: Class  ) {
        /* validate the module */
        if ( module ) {
            const descriptor = Module.descriptor(module)
            if ( ! descriptor ) {
                 throw new Error(`${module.name} is not a UI module`)
            }
            this.bootstrapModule( module )
        }

        /* subscribe to all a routerlink anchors */
        document.addEventListener('click', (event) => {
            console.log(event.target)
        })

    }

    bootstrapModule( module: Class ) {
        const descriptor = Module.descriptor(module)
        const injector = new Injector()
        // descriptor.injector = injector
        // console.log("Application Routes",descriptor.routes )
        // this.addRoutesToRouter( module, descriptor.routes )
        const component = descriptor.bootstrap
        if ( ! component ) {
            throw new Error(`Cannot boostrap module ${module.name}, does not specify a component to bootstrap.`)
        }
        this.bootstrapComponent(module, component)
    }

    bootstrapComponent( module: Class, component: Class ) {
        const harness = new ComponentHarness(this, module, component)

        this.element.appendChild( harness.dom )

        harness.updateDomWithExpressionValues()
    }

    changeComponentBecauseOfRouter( component ) {
        console.log("Changing Route")
        
        // const harness = new ComponentHarness(this, component)
        
        // this.element.innerHTML = ""

        // this.element.appendChild( harness.dom )

        // harness.updateDomWithExpressionValues()
    }

    // addRoutesToRouter( module: Class, routes: RouteDefinition[] ) {
    //     if ( routes ) this.router.addRoutes(module, routes)
    // }




}

