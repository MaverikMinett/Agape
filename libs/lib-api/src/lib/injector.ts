import { Class } from '@lib/types';


export class Injector {

    private services: Class[]

    get( service: Class ) {
        // throw error if no provider for service
    }

    registerService<T extends Class>( service: T, value?: InstanceType<T> )
    registerService<T extends Class>( service: T, value?: any ) {

    }

    instantiateService() {

    }


}


export class RequestInjector extends Injector {

    requ
}
