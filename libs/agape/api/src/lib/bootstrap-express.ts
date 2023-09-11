import { Router as ExpressRouter } from "express"
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'

import { Api } from './api'
import { Controller, Module } from "./decorators"

import { ActionDescriptor, ControllerDescriptor, ModuleDescriptor } from "./descriptors"
import { Class } from "@agape/types"
import { ApiRequest } from "./api-request"
import { ApiResponse } from "./api-response"

import express from 'express';
import { SwaggerController } from "./modules/swagger/swagger.module"


export function routeTo( 
    api: Api, 
    controllerInstance: InstanceType<Class>, 
    moduleDescriptor: ModuleDescriptor,
    controllerDescriptor: ControllerDescriptor,
    actionDescriptor: ActionDescriptor ) {

    return async function (req: ExpressRequest, res: ExpressResponse ) {
        const apiRequest = new ApiRequest()
        apiRequest.params = req.params
        apiRequest.body   = req.body
        apiRequest.query  = req.query
        apiRequest.headers  = req.headers
        apiRequest.path  = req.path
        apiRequest.method = req.method as 'GET'|'PUT'|'POST'|'PATCH'|'DELETE'

        const apiResponse = new ApiResponse()

        const context:any = { req, res }

        await api.callAction(
            controllerInstance, 
            moduleDescriptor, 
            controllerDescriptor, 
            actionDescriptor, 
            apiRequest, 
            apiResponse,
            context)
        res.status(apiResponse.statusCode)

        if ( apiResponse.statusText !== undefined )
            res.statusMessage = apiResponse.statusText

        for ( let content of apiResponse.content ) {
            res.send(content)
        }
    }

}

export function bootstrapExpress( router: ExpressRouter, module: Class ) {

    const newApi = new Api(module)

    let moduleDescriptor = Module.descriptor(module)

    let pathSegments = [ moduleDescriptor.path ]

    function processControllers( controllers: Class[] ) {

        for ( let controller of controllers ) {

            let controllerDescriptor = Controller.descriptor(controller)
    
            pathSegments.push(controllerDescriptor.path)
    
            let controllerInstance = newApi.getController(controller)
    
            for ( let [actionName, actionDescriptor] of controllerDescriptor.actions.entries() ) {
                const routePath = [...pathSegments, actionDescriptor.ʘroute.path]
                    .filter( segment => segment !== undefined && segment !== "" && segment !== "/" )
                    .join("/")

                if ( actionDescriptor.ʘstaticFiles ) {

                    for ( let staticFilePath of actionDescriptor.ʘstaticFiles ) {
                        router.use(routePath, express.static(staticFilePath))
                    }
                }
                else {
                    router[actionDescriptor.ʘroute.method](
                        `/${routePath}`, 
                        routeTo(newApi, controllerInstance, moduleDescriptor, controllerDescriptor, actionDescriptor)
                    )
                }
    
            }
    
            pathSegments.pop()
    
        }
    }

    function processModules( modules: Class[] ) {
        for ( const childModule of modules ) {
            const childModuleDescriptor = Module.descriptor(childModule)

            pathSegments.push(childModuleDescriptor.path)

            processControllers( childModuleDescriptor.controllers )
            processModules(childModuleDescriptor.modules)
        }
    }

    
    processControllers( moduleDescriptor.controllers )

    processModules( moduleDescriptor.modules )

}


