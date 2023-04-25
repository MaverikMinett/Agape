import { Class } from '@agape/types';
import { Service } from './decorators'

export class Injector {

    private services: Class[]

    serviceMap = new Map<Class, any>()

    get( service: Class ) {
        
        // TODO: If the passed in class is not actually injectable, then throw an error
        const descriptor = Service.descriptor(service)
        if ( ! descriptor ) {
            throw new Error(`Could not inject ${service.name}, not a service`)
        }

        let instance = this.serviceMap.get(service)
        if ( ! instance ) {
            instance = this.instantiateService(service)
            this.serviceMap.set(service, instance)
        }
        return instance
    }



    private instantiateService(service: Class) {

        // TODO: If the service has injectables, inject them
        const descriptor = Service.descriptor(service)

        const services = descriptor.services.map( s => this.get(s) )

        return new service(...services)
    }


}


// export class RequestInjector extends Injector {

//     requ
// }
