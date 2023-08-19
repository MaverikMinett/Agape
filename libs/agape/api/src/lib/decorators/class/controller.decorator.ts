import { ControllerDescriptor } from '../../descriptors/controller.descriptor';
import { StubDescriptor } from '../../descriptors';
import { ControllerParams } from '../../types';
import { Injectable } from '..'

function parseControllerParams(...args: Array<ControllerParams|string>) {
    /* parse the parameters */
    let arg: ControllerParams|string
    let path: string
    let params: ControllerParams
    while ( args.length ) {
        arg = args.shift()
        if ( typeof arg === 'string' ) path = arg
        else params = arg
    }
    return { path, params }
}

/**
 * Declare a class as a controller
 * @param path Path prefix for routes in controller
 */
export function Controller( path?:string )
export function Controller( params: ControllerParams )
export function Controller( path:string, params?: ControllerParams ) 
export function Controller( ...args: Array<ControllerParams|string> ){

    const { path, params } = parseControllerParams(...args)

    return function <T extends {new(...args:any[]):{}}>( target:T ) {

        /* create a descriptor */
        const descriptor = Controller.descriptor( target, true )

        /* assign path if set in decorator */
        if ( path !== undefined) descriptor.path = path

        /* assign any parameters to descriptor from decorator */
        params && Object.assign(descriptor, params)

        /* get the stub created from any property/method decorators */
        const stub = StubDescriptor.descriptor( target )

        /* merge the stub with the controller descriptor */
        if ( stub ) stub.finalizeController( descriptor )

        /* dependency injection */
        const services = Reflect.getMetadata('design:paramtypes', target);

        /* validate and assign services to descriptor */
        if ( services ) {

            /* validate that constructor params are injectable services */
            for ( let service of services ) {
                const serviceDescriptor = Injectable.descriptor(service)
                /* throw an error if not a service */
                if ( ! serviceDescriptor ) 
                    throw new Error(`Invalid controller constructor parameter, ${service.name} is not a service`)
            }

            /* assign services to descriptor */
            descriptor.services = [...services]
        }

        return target
    }
}

/**
 * Get the controller descriptor 
 * @param target Class or prototype of a controller class
 * @param create If a descriptor should be created for the target
 * @returns Controller descriptor for target
 */
Controller.descriptor = function ( target:any, create:boolean=false ) {
    if ( typeof target === "function" ) target = target.prototype

    let controllerDescriptor: ControllerDescriptor = Reflect.getMetadata( "controller:descriptor", target )

    if ( ! controllerDescriptor && create === true ) {
        controllerDescriptor = new ControllerDescriptor( target )
        Reflect.defineMetadata("controller:descriptor", controllerDescriptor, target)
    }

    return controllerDescriptor
}
