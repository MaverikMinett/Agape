import { Class } from "@agape/types";
import { Injector } from "./injector";
import { ActionDescriptor, ControllerDescriptor, ModuleDescriptor } from "./descriptors";
import { ApiRequest } from "./api-request";
import { ApiResponse } from "./api-response";
import { Exception } from "@agape/exception";
import { Controller, Module } from "./decorators";
import { NextFunction } from "./types";
import { Middleware } from "./interfaces/middleware.interface";


export class Api {
    injector: Injector = new Injector()

    middlewareInjector: Injector = new Injector()

    debug: boolean = true

    constructor( public module: Class ) {
       const descriptor = Module.descriptor(module)
       if ( ! descriptor ) throw new Error(`${module.name} is not an api Module`) 

       this.injector.provide( Api, this )
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
        moduleDescriptor: ModuleDescriptor,
        controllerDescriptor: ControllerDescriptor,
        actionDescriptor: ActionDescriptor, 
        apiRequest: ApiRequest,
        apiResponse: ApiResponse ) {

            const executionStack: NextFunction[] = []

            let executionIndex = -1

            const next = async() => {
                executionIndex++
                if ( executionStack[executionIndex] ) {
                    await executionStack[executionIndex](apiRequest, apiResponse, next)
                }
            }

            const executeAction = async( apiRequest: ApiRequest, apiResponse: ApiResponse, next: NextFunction ) => {
                await this.performAction(controllerInstance, actionDescriptor, apiRequest, apiResponse)
            } 

            executionStack.push(executeAction)

            const moduleMiddlewares = moduleDescriptor.middlewares
            const controllerMiddlewares = controllerDescriptor.middlewares
            const actionMiddlewares = actionDescriptor.ʘmiddlewares


            const middlewares = [...moduleMiddlewares, ...controllerMiddlewares, ...actionMiddlewares]

            for ( let middleware of middlewares ) {
                const middlewareInstance: Middleware = this.injector.get(middleware)
                const executeMiddleware = async() => {
                    await middlewareInstance.activate(apiRequest, apiResponse, next)
                }
                executionStack.unshift(executeMiddleware)
            }

            try {
                await next()
            }
            catch(error) {
                if ( this.debug ) {
                    console.log("Received error", error)
                }
                if ( error instanceof Exception ) {
                    apiResponse.status( error.status )
                    apiResponse.send({ status: error.status, message: error.message})
                }
                else {
                    apiResponse.status(400, "Bad Request")
                    apiResponse.send( error.message )
                    console.error( error )
                }
            }
    }

    async performAction( 
        controllerInstance: InstanceType<Class>, 
        actionDescriptor: ActionDescriptor, 
        apiRequest: ApiRequest,
        apiResponse: ApiResponse ) {
        // const controllerInstance = this.getController( controller )
        const method = controllerInstance[actionDescriptor.name]

        // this is where disposable service action needs to happen
        const params = []

        for ( let actionParameterDefinition of actionDescriptor.ʘinject ) {
            const name = actionParameterDefinition.parameter
            if ( name === 'body' ) params.push(apiRequest.body)
            else if ( name === 'params' ) params.push(apiRequest.params)
            else if ( name === 'query' ) params.push(apiRequest.params)
            else if ( name === 'request' ) params.push(apiRequest)
            else if ( name === 'response' ) params.push(apiResponse)
            else params.push(undefined)
        }

        // if ( actionDescriptor.ʘinject ) {
            // for ( const [name,type] of Object.entries(actionDescriptor.ʘinject) ) {
            //     if ( name === 'payload' || name === 'body' ) params.push(apiRequest.body)
            //     else if ( name === 'params' ) params.push(apiRequest.params)
            //     else if ( name === 'query' || name === 'queryParams' ) params.push(apiRequest.params)
            //     else if ( name === 'request' || name === 'req') params.push(apiRequest)
            //     else if ( name === 'response' || name === 'res' ) params.push(apiResponse)
            //     else if ( name === 'headers' ) params.push(apiRequest.headers)
            //     else throw new Error(`Invalid paramter name '${name}'`)
            // }
        // }

        if ( this.debug ) {
            console.log(`Calling action ${actionDescriptor.name} on ${controllerInstance.constructor.name}`)
        }
        const content = await method.call(controllerInstance, ...params)
        if ( this.debug ) {
            console.log("Recieved content", content)
        }
        const statusCode = actionDescriptor.ʘstatus
        apiResponse.status(statusCode)
        apiResponse.send(content)
    }


}