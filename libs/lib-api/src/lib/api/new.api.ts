import { Class } from '@agape/types';
import { Exception } from '@agape/exception';
import { Module } from '../decorators/class/module.decorator'
import { ActionDescriptor } from '../descriptors';
import { ApiRequest } from '../api-request';
import { ApiResponse } from '../api-response';
import { Controller } from '../decorators';
import { Injector } from '../injector';
import { Api } from './abstract.api';

export class NewApi extends Api {

    injector: Injector = new Injector()

    constructor( public module: Class ) {
        super()
       const descriptor = Module.descriptor(module)
       if ( ! descriptor ) throw new Error(`${module.name} is not an api Module`) 
    }
    
    getController<T extends Class>( controller: T ): InstanceType<T> {
        return this.instantiateController( controller )
    }
}


