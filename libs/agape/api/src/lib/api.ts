import { Class } from "@agape/types";
import { Injector } from "./injector";
import { ActionDescriptor, ControllerDescriptor, ModuleDescriptor } from "./descriptors";
import { ApiRequest } from "./api-request";
import { ApiResponse } from "./api-response";
import { Exception } from "@agape/exception";
import { Controller, Module } from "./decorators";
import { NextFunction } from "./types";
import { Middleware } from "./interfaces/middleware.interface";
import { LogStash } from "./interfaces/log-stash";
import { Alchemy } from "@agape/alchemy";
import { Model } from "@agape/model";
import { ValidationException } from "./exceptions/validation-exception";


export class Api {
    injector: Injector = new Injector()

    middlewareInjector: Injector = new Injector()

    debug: boolean = true

    logging: boolean = true

    bodyParsing: boolean = true

    alchemy: Alchemy = new Alchemy()

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
        moduleDescriptors: ModuleDescriptor[],
        controllerDescriptor: ControllerDescriptor,
        actionDescriptor: ActionDescriptor, 
        apiRequest: ApiRequest,
        apiResponse: ApiResponse,
        context: any ) {

            let logStash: LogStash 
            if ( this.logging ) {
                logStash = this.initiateLogging()
            }

            if ( this.bodyParsing ) {
                try {
                    this.parseBody(actionDescriptor, apiRequest, logStash)
                }
                catch(error) {
                    this.handleError(error, apiRequest, apiResponse, logStash)
                    return
                }
            }

            const executionStack: NextFunction[] = []

            let executionIndex = -1

            const next = async() => {
                executionIndex++
                if ( executionStack[executionIndex] ) {
                    await executionStack[executionIndex](apiRequest, apiResponse, next)
                }
            }

            const executeAction = async( apiRequest: ApiRequest, apiResponse: ApiResponse, next: NextFunction ) => {
                await this.performAction(controllerInstance, actionDescriptor, apiRequest, apiResponse, context)
            } 

            const middlewares = this.getMiddlewares(moduleDescriptors, controllerDescriptor, actionDescriptor)
            
            for ( let middleware of middlewares ) {
                const middlewareInstance: Middleware = this.injector.get(middleware)
                const executeMiddleware = async() => {
                    await middlewareInstance.activate(apiRequest, apiResponse, next)
                }
                executionStack.push(executeMiddleware)
            }
            executionStack.push(executeAction)

            if ( this.logging ) {
                executionStack.push( async() => {
                    this.finishLogging(logStash, apiRequest, apiResponse)
                })
            }

            try {
                await next()
            }
            catch(error) {
                this.handleError( error, apiRequest, apiResponse, logStash )
            }
    }

    async performAction( 
        controllerInstance: InstanceType<Class>, 
        actionDescriptor: ActionDescriptor, 
        apiRequest: ApiRequest,
        apiResponse: ApiResponse,
        context: any ) {
        // const controllerInstance = this.getController( controller )
        const method = controllerInstance[actionDescriptor.name]

        // this is where disposable service action needs to happen
        const params = []

        for ( let actionParameterDefinition of actionDescriptor.ʘinject ) {
            const name = actionParameterDefinition.parameter
            if ( name === 'body' ) params.push(apiRequest.body)
            else if ( name === 'params' ) params.push(apiRequest.params)
            else if ( name === 'query' ) params.push(apiRequest.query)
            else if ( name === 'request' ) params.push(apiRequest)
            else if ( name === 'response' ) params.push(apiResponse)
            else if ( name === 'execution-context' ) params.push(context)
            else if ( name === 'auth' ) params.push(apiRequest.auth)
            else params.push(undefined)
        }

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

    private getMiddlewares(
        moduleDescriptors: ModuleDescriptor[],
        controllerDescriptor: ControllerDescriptor,
        actionDescriptor: ActionDescriptor, 
    ) {
        const middlewares: Class<Middleware>[] = []
        const controllerMiddlewares = controllerDescriptor.middlewares
        const actionMiddlewares = actionDescriptor.ʘmiddlewares
        for ( const moduleDescriptor of moduleDescriptors ) {
            middlewares.push(...moduleDescriptor.middlewares)
        }
        middlewares.push(...controllerMiddlewares, ...actionMiddlewares)

        return middlewares
    }

    initiateLogging() {
        const stash: LogStash = { start: new Date() }
        return stash
    }

    finishLogging( stash: LogStash, request: ApiRequest, response: ApiResponse ) {
        let log: string = ''
        const startTime: Date = stash.start
        const timestamp = startTime.toISOString()
        log += timestamp
        log += "  "
        log += request.method
        log += "  "
        log += response.statusCode
        log += "  "
        log += request.path
        const endTime = new Date()
        const diff = endTime.getTime() - startTime.getTime() 
        log += "  "
        log += diff + 'ms'
        console.log(log)
    }

    parseBody( action: ActionDescriptor, apiRequest: ApiRequest, logStash: LogStash ) {

        const actionParameterDefinition = action.ʘinject.find( definition => definition.parameter === 'body' )

        if ( actionParameterDefinition ) {
            const designType = actionParameterDefinition.designType

            const modelDescriptor = Model.descriptor(designType)
    
            if ( modelDescriptor ) {
                const { valid, error, value } = this.alchemy.deserialize(designType, apiRequest.body)
                if ( ! valid ) {
                    if ( this.debug ) {
                        console.log("Invalid request body", error)
                    }
                    throw new ValidationException("Invalid request body", error)
                }
                else {
                    apiRequest.body = value
                }
            }
        }
    }

    handleError( error: Error, apiRequest: ApiRequest, apiResponse: ApiResponse, logStash: LogStash ) {
        if ( this.debug ) {
            console.log("Received error", error)
        }
        if ( error instanceof Exception ) {

            const constructor: Class = Object.getPrototypeOf(error).constructor
            const descriptor = Model.descriptor( constructor )
            if ( descriptor ) {
                const responseBody = this.alchemy.serialize( constructor, error )
                apiResponse.status( error.status )
                apiResponse.send(responseBody)
            }
            else {
                apiResponse.status( error.status )
                apiResponse.send({ status: error.status, message: error.message})
            }
        }
        else {
            apiResponse.status(400, "Bad Request")
            apiResponse.send( error.message )
            console.error( error )
        }
        if ( this.logging ) {
            this.finishLogging(logStash, apiRequest, apiResponse)
        }
    }
}