import { Class } from '@agape/types';
import { ModuleDescriptor } from '../../descriptors/module.descriptor';
import { Controller } from './controller.decorator';
import { Middleware } from '../../interfaces/middleware.interface';
import { Injectable } from './injectable.decorator';

function parseModuleParams(...args: Array<ModuleParams|string>) {
    /* parse the parameters */
    let arg: ModuleParams|string
    let path: string
    let params: ModuleParams
    while ( args.length ) {
        arg = args.shift()
        if ( typeof arg === 'string' ) path = arg
        else params = arg
    }
    return { path, params }
}



export interface ModuleParams {
    path?: string,
    modules?: Class[],
    controllers?: Class[],
    provides?: Class[],
    middleware?: Array<Class<Middleware>>
}



/**
 * Declare a class as a module
 * @param path Path prefix for routes in module
 */
export function Module( path?:string )
export function Module( params: ModuleParams )
export function Module( path:string, params: ModuleParams ) 
export function Module( ...args: Array<ModuleParams|string> ) {

    /* parse the decorator parameters */
    const { path, params } = parseModuleParams(...args)

    return function <T extends {new(...args:any[]):{}}>( target:T ) {

        /* create a descriptor */
        const descriptor = Module.descriptor( target, true )

        /* assign path if set in decorator */
        if ( path !== undefined) descriptor.path = path

        /* perform some validation */
        if ( params?.modules ) {
            /* validate that constructor params are injectable services */
            for ( let module of params.modules ) {
                const moduleDescriptor = Module.descriptor(module)
                /* throw an error if not a service */
                if ( ! moduleDescriptor ) 
                    throw new Error(`Invalid argument to 'modules', ${module.name} is not a Module`)
            }
        }

        /* perform some validation */
        if ( params?.controllers ) {
            /* validate that constructor params are injectable services */
            for ( let controller of params.controllers ) {
                const controllerDescriptor = Controller.descriptor(controller)
                /* throw an error if not a service */
                if ( ! controllerDescriptor ) 
                    throw new Error(`Invalid argument to 'controllers', ${controller.name} is not a Controller`)
            }
        }

        /* perform some validation */
        if ( params?.provides ) {
            /* validate that constructor params are injectable services */
            for ( let service of params.provides ) {
                const serviceDescriptor = Injectable.descriptor(service)
                /* throw an error if not a service */
                if ( ! serviceDescriptor ) 
                    throw new Error(`Invalid argument to 'provides', ${service.name} is not a Service`)
            }
        }

        /* assign any parameters on the descriptor from the decorator params */
        params && Object.assign(descriptor, params)

    }

}


/**
 * Get the module descriptor
 * @param target Class or prototype of module class
 * @param create If a descriptor should be created for the target
 * @returns Module descriptor for the target
 */
Module.descriptor = function ( target:any, create:boolean=false ) {
    if ( typeof target === "function" ) target = target.prototype

    let descriptor: ModuleDescriptor = Reflect.getMetadata( "api:module:descriptor", target )

    if ( ! descriptor && create===true ) {
        descriptor = new ModuleDescriptor( target )
        Reflect.defineMetadata("api:module:descriptor", descriptor, target)
    }

    return descriptor
}
