import { ComponentDescriptor } from "../descriptors/component"



export function Component( params: any ) {
    return function ( target: any ) {


        const descriptor = Component.descriptor(target, true )

        if ( params ) Object.assign(descriptor, params)
        
        return target
    }
}

Component.descriptor = function ( target: any, create=false ) {

    if ( typeof target === "function" ) target = target.prototype

    // console.log( target )

    let descriptor: ComponentDescriptor = Reflect.getMetadata('ui:component:descriptor', target)

    // console.log( descriptor )

    if ( ! descriptor && create === true ) {
        descriptor = new ComponentDescriptor( )
        Reflect.defineMetadata("ui:component:descriptor", descriptor, target)
    }

    return descriptor
}