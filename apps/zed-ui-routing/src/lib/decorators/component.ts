import { ComponentDescriptor } from "../descriptors/component"


export interface ComponentParams {
    selector: string;
    template?: string;
}

export function Component( params: ComponentParams ) {
    return function ( target: any ) {

        const descriptor = Component.descriptor(target, true )

        if ( params ) Object.assign(descriptor, params)

        const injected = Reflect.getMetadata('design:paramtypes', target)

        descriptor.injected = injected

        // if ( injected ) {
        //     for ( let injectionToken of injected ) {

        //     }
        // }
        
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