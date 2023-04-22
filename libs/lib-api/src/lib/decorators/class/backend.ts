import { BackendDescriptor } from '../../descriptors/backend';
import { StubDescriptor } from '../../descriptors/stub';


export function Backend( params?: any ) {

    return function <T extends {new(...args:any[]):{}}>( target:T ) {

        const descriptor = Backend.descriptor( target, true )

        params && Object.assign(descriptor, params)

        const stub = StubDescriptor.descriptor( target )

        if ( stub ) stub.finalizeBackend( descriptor )

        return target

    }

}

Backend.descriptor = function ( target:any, create:boolean=false ) {
    if ( typeof target === "function" ) target = target.prototype

    let descriptor: BackendDescriptor = Reflect.getMetadata( "backend:descriptor", target )

    if ( ! descriptor && create===true ) {
        descriptor = new BackendDescriptor( target )
        Reflect.defineMetadata("backend:descriptor", descriptor, target)
    }

    return descriptor
}
