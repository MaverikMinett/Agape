import { Class } from "@agape/types";
import { ComponentHarness } from "./component-harness";
import { Module } from "./decorators/module";


export class App {


    

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
        const component = descriptor.components[0]
        this.bootstrapComponent(component)
    }

    bootstrapComponent( component: Class ) {
        const harness = new ComponentHarness(component)

        this.element.appendChild( harness.dom )

        harness.updateDomWithExpressionValues()
    }




}

