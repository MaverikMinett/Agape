import { Class } from "@agape/types";
import { Injector } from "./injector";
import { ActionDescriptor } from "./descriptors";
import { ApiRequest } from "./api-request";
import { ApiResponse } from "./api-response";
import { Exception } from "@agape/exception";
import { Controller, Module } from "./decorators";



export class Api {
    injector: Injector = new Injector()

    constructor( public module: Class ) {
       const descriptor = Module.descriptor(module)
       if ( ! descriptor ) throw new Error(`${module.name} is not an api Module`) 
    }

    getController<T extends Class>( controller: T ): InstanceType<T> {
        return this.instantiateController( controller )
    }

    protected instantiateController<T extends Class>( controller: T ): InstanceType<T> {
        const descriptor = Controller.descriptor(controller)

        const services = descriptor.services.map( s => this.injector.get(s) )

        const instance = new controller(...services)

        return instance
    }

    async callAction( 
        controllerInstance: InstanceType<Class>, 
        actionDescriptor: ActionDescriptor, 
        apiRequest: ApiRequest,
        apiResponse: ApiResponse ) {
        // const controllerInstance = this.getController( controller )
        const method = controllerInstance[actionDescriptor.name]

        // this is where disposable service action needs to happen
        const params = []
        if ( actionDescriptor.ʘinject ) {
            for ( const [name,type] of Object.entries(actionDescriptor.ʘinject) ) {
                if ( name === 'payload' || name === 'body' ) params.push(apiRequest.body)
                else if ( name === 'params' ) params.push(apiRequest.params)
                else if ( name === 'query' || name === 'queryParams' ) params.push(apiRequest.params)
                else if ( name === 'request' || name === 'req') params.push(apiRequest)
                else if ( name === 'response' || name === 'res' ) params.push(apiResponse)
                else if ( name === 'headers' ) params.push(apiRequest.headers)
                else throw new Error(`Invalid paramter name '${name}'`)
            }
        }


        try {
            const content = await method.call(controllerInstance, ...params)
            apiResponse.send(content)
        }
        catch ( error ) {
            if ( error instanceof Exception ) {
                apiResponse.status( error.status )
                apiResponse.send( error.message )
            }
            else {
                apiResponse.status(400, "Bad Request")
                apiResponse.send( error.message )
            }
        }
        
    }
}