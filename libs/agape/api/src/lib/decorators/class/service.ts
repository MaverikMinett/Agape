import { ServiceDescriptor } from '../../descriptors/service';
import { StubDescriptor } from '../../descriptors/stub';


export function Service( params?: any ) {

    return function <T extends {new(...args:any[]):{}}>( target:T ) {

        const descriptor = Service.descriptor( target, true )

        params && Object.assign(descriptor, params)

        const stub = StubDescriptor.descriptor( target )

        if ( stub ) stub.finalizeService( descriptor )

        /* dependency injection */
        const services = Reflect.getMetadata('design:paramtypes', target);

        if ( services ) descriptor.services = [...services]

        return target
    }

}

Service.descriptor = function ( target:any, create:boolean=false ) {
    if ( typeof target === "function" ) target = target.prototype

    let descriptor: ServiceDescriptor = Reflect.getMetadata( "service:descriptor", target )

    if ( ! descriptor && create===true ) {
        descriptor = new ServiceDescriptor( target )
        Reflect.defineMetadata("service:descriptor", descriptor, target)
    }

    return descriptor
}
