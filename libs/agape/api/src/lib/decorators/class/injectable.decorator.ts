import { InjectableDescriptor } from '../../descriptors/injectable.descriptor';
import { StubDescriptor } from '../../descriptors/stub';

/**
 * Declare a class as a service
 */
export function Injectable( ) {

    return function <T extends {new(...args:any[]):{}}>( target:T ) {

        /* create a descriptor */
        const descriptor = Injectable.descriptor( target, true )

        /* assign parameters defined in the decorator */
        // params && Object.assign(descriptor, params)

        /* get the stub created from any property/method decorators */
        const stub = StubDescriptor.descriptor( target )

        /* merge the stub with the service descriptor */
        if ( stub ) stub.finalizeInjectable( descriptor )

        /* dependency injection */
        const services = Reflect.getMetadata('design:paramtypes', target);

        /* validate and assign services to descriptor */
        if ( services ) {

            /* validate that constructor params are injectable services */
            for ( let service of services ) {
                const serviceDescriptor = Injectable.descriptor(service)
                /* throw an error if not a service */
                if ( ! serviceDescriptor ) 
                    throw new Error(`Invalid service constructor parameter, ${service.name} is not a service`)
            }

            /* assign services to descriptor */
            descriptor.services = [...services]
        }

        return target
    }

}

/**
 * Get the service descriptor 
 * @param target Class or prototype of a service class
 * @param create If a descriptor should be created for the target
 * @returns Injectable descriptor for target
 */
Injectable.descriptor = function ( target:any, create:boolean=false ) {
    if ( typeof target === "function" ) target = target.prototype

    let descriptor: InjectableDescriptor = Reflect.getMetadata( "service:descriptor", target )

    if ( ! descriptor && create===true ) {
        descriptor = new InjectableDescriptor( target )
        Reflect.defineMetadata("service:descriptor", descriptor, target)
    }

    return descriptor
}
