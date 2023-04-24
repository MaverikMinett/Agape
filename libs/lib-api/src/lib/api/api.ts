import { Class } from '@agape/types';
import { Exception } from '@agape/exception';
import { Module } from '../decorators/class/module.decorator'
import { ActionDescriptor } from '../descriptors';
import { ApiRequest } from '../api-request';
import { ApiResponse } from '../api-response';
import { Controller } from '../decorators';
import { Api } from './abstract.api';


export class JitApi extends Api {

    controllers: Class[] = []

    modules: Class[] = []

    constructor( modules?: Class[] ) {
        super()
        if ( modules ) modules.forEach( module => this.registerModule(module) )
    }

    registerModule( module: Class ) {

        this.modules.push( module )

        const descriptor = Module.descriptor( module )

        const controllers = descriptor.getControllers()

        this.controllers.push( ...controllers )
    }


    

    getController<T extends Class>( controller: T ): InstanceType<T> {
        return this.instantiateController( controller )
    }

}

export abstract class AbstractApi {

}

