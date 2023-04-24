import { Class } from "@agape/types";
import { Api } from "./abstract.api";
import { Module } from "../decorators";

/**
 * The Ahead-of-time controller uses a single instance of the controller.
 * The controller is instantiated the first time it is used and then reused
 * each time an action is called on the controller.
 */
export class AotApi extends Api {

    controllers: Class[] = []

    controllerCache = new Map<Class,InstanceType<Class>>()

    getController<T extends Class>(controller: T): InstanceType<T> {

        const cached = this.controllerCache.get(controller)
        if ( cached ) return cached
        // if ( this.controllerCache.has(controller) )
        //     return this.controllerCache.get(controller)

        const instance = this.instantiateController(controller);
        this.controllerCache.set(controller, instance)
        return instance
    }


    registerModule( module: Class ) {

        const descriptor = Module.descriptor( module )

        const controllers = descriptor.getControllers()

        this.controllers.push( ...controllers )
    }

}