import { Class, Dictionary } from "@agape/types";
import { ComponentHarness } from "./component-harness";
import { Module } from "./decorators/module";
import { ApplicationContext } from "./interfaces/application-context.interface";
import { Router } from "./modules/router/router";
import { RouteDefinition } from "./modules/router/route-definition.interface";
import { Injector } from "./injector";
import { ComponentContext, ModuleDescriptor } from "./descriptors/module";
import { Component } from "./decorators/component";
import { ModuleContext } from "./module-container";



export class App implements ApplicationContext {

    // router: Router = new Router( this )

    injector = new Injector()

    constructor( public element: HTMLElement, public module?: Class  ) {
        /* validate the module */
        if ( module ) {
            const descriptor = Module.descriptor(module)
            if ( ! descriptor ) {
                 throw new Error(`${module.name} is not a UI module`)
            }
            this.bootstrapModule( module )
        }

    }

    bootstrapModule( module: Class ) {
        const descriptor = Module.descriptor(module)
        const injector = new Injector()

        const component = descriptor.bootstrap

        const moduleContext = new ModuleContext( module )
        if ( ! component ) {
            throw new Error(`Cannot boostrap module ${module.name}, does not specify a component to bootstrap.`)
        }
        this.bootstrapComponent(moduleContext, component)
    }

    bootstrapComponent( moduleContext: ModuleContext<any>, component: Class ) {
        const harness = new ComponentHarness(moduleContext, component)

        this.element.appendChild( harness.dom )

        harness.updateDomWithExpressionValues()
    }




}

