import { Class } from "@agape/types"
import { ModuleDescriptor } from "../descriptors/module"
import { Component } from "./component"


export interface ModuleParams {
    components?: Class[]
    modules?: Class[]
    provides?: Class[]
}

export function Module( params?: ModuleParams ) {
    return function ( target: any ) {

        const descriptor = Module.descriptor(target, true )

        /* perform some validation */
        if ( params?.modules ) {
            /* validate that constructor params are injectable services */
            for ( let module of params.modules ) {
                const moduleDescriptor = Module.descriptor(module)
                /* throw an error if not a module */
                if ( ! moduleDescriptor ) 
                    throw new Error(`Invalid argument to 'modules', ${module.name} is not a Module`)
            }
        }
        /* perform some validation */
        if ( params?.components ) {
            /* validate that constructor params are injectable services */
            for ( let component of params.components ) {
                const controllerDescriptor = Component.descriptor(component)
                /* throw an error if not a service */
                if ( ! controllerDescriptor ) 
                    throw new Error(`Invalid argument to 'components', ${component.name} is not a Component`)
            }
        }

        /* assign any parameters on the descriptor from the decorator params */
        if ( params ) Object.assign(descriptor, params)

        return target
    }
}

Module.descriptor = function ( target: any, create=false ) {

    if ( typeof target === "function" ) target = target.prototype

    let descriptor: ModuleDescriptor = Reflect.getMetadata('ui:module:descriptor', target)

    if ( ! descriptor && create === true ) {
        descriptor = new ModuleDescriptor( )
        Reflect.defineMetadata("ui:module:descriptor", descriptor, target)
    }

    return descriptor
}