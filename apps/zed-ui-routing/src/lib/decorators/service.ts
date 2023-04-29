import { ServiceDescriptor } from "../descriptors/service"
import { ComponentDescriptor } from "../descriptors/component"


export interface ServiceParams {
    providedIn?:'root'
}

export function Service( params?: ServiceParams ) {
    return function ( target: any ) {

        const descriptor = Service.descriptor(target, true )

        if ( params ) Object.assign(descriptor, params)
        
        return target
    }
}

Service.descriptor = function ( target: any, create=false ) {

    let targetClass = target 
    if ( typeof target === "function" ) {
        target = target.prototype
    }
    else {
        targetClass = target.constructor
    }


    let descriptor: ServiceDescriptor = Reflect.getMetadata('ui:component:descriptor', target)

    if ( ! descriptor && create === true ) {
        descriptor = new ServiceDescriptor( targetClass )
        Reflect.defineMetadata("ui:component:descriptor", descriptor, target)
    }

    return descriptor
}