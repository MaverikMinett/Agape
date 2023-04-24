import { Class } from '@agape/types';
import { ModuleDescriptor } from '../../descriptors/module.descriptor';


export interface ModuleParams {
    path: string,
    modules: Class[],
    controllers: Class[],
}

export function Module( params?: any ) {

    return function <T extends {new(...args:any[]):{}}>( target:T ) {

        const descriptor = Module.descriptor( target, true )

        params && Object.assign(descriptor, params)

    }

}

Module.descriptor = function ( target:any, create:boolean=false ) {
    if ( typeof target === "function" ) target = target.prototype

    let descriptor: ModuleDescriptor = Reflect.getMetadata( "api:module:descriptor", target )

    if ( ! descriptor && create===true ) {
        descriptor = new ModuleDescriptor( target )
        Reflect.defineMetadata("api:module:descriptor", descriptor, target)
    }

    return descriptor
}
