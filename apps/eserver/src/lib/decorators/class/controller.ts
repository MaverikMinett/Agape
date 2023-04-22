import { ControllerDescriptor } from '../../descriptors/controller';
import { StubDescriptor } from '../../descriptors';
import { ControllerParams } from '../../types';


// export function Controller( path:string )
// export function Controller( params?: ControllerParams )
export function Controller( params?: ControllerParams|string ) {
    return function <T extends {new(...args:any[]):{}}>( target:T ) {

        // if ( typeof params === 'string' ) params = { path: params }

        const descriptor = Controller.descriptor( target, true )

        params && Object.assign(descriptor, params)

        const stub = StubDescriptor.descriptor( target )

        if ( stub ) stub.finalizeController( descriptor )

        return target
    }
}

Controller.descriptor = function ( target:any, create:boolean=false ) {
    if ( typeof target === "function" ) target = target.prototype

    let controllerDescriptor: ControllerDescriptor = Reflect.getMetadata( "controller:descriptor", target )

    if ( ! controllerDescriptor && create === true ) {
        controllerDescriptor = new ControllerDescriptor( target )
        Reflect.defineMetadata("controller:descriptor", controllerDescriptor, target)
    }

    return controllerDescriptor
}
