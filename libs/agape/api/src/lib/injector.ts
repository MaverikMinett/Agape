import { Class } from '@agape/types';
import { Injectable } from './decorators'

export class Injector {

    private services: Class[]

    serviceMap = new Map<Class, any>()

    get( injectable: Class ) {
        
        // TODO: If the passed in class is not actually injectable, then throw an error
        // const descriptor = Injectable.descriptor(injectable)
        // if ( ! descriptor ) {
        //     throw new Error(`Could not inject ${injectable.name}, not a service`)
        // }

        let instance = this.serviceMap.get(injectable)
        if ( ! instance ) {
            instance = this.instantiateService(injectable)
            this.serviceMap.set(injectable, instance)
        }
        return instance
    }

    provide( token: any, value: any ) {
        this.serviceMap.set( token, value )
    }   

    private instantiateService(service: Class) {

        // TODO: If the service has injectables, inject them
        const descriptor = Injectable.descriptor(service)

        const services = descriptor.services.map( s => this.get(s) )

        return new service(...services)
    }


}


// export class RequestInjector extends Injector {

//     requ
// }
