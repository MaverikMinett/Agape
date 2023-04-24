import { Router as ExpressRouter } from "express"
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'

import { Api, AotApi } from "./api"
import { Controller } from "./decorators"

import { ActionDescriptor } from "./descriptors"
import { Class } from "@agape/types"
import { ApiRequest } from "./api-request"
import { ApiResponse } from "./api-response"

export function routeTo( api: Api, controller: Class, actionDescriptor: ActionDescriptor ) {

    // const controllerInstance   = api.getController( controller )
    // const method = controllerInstance[actionDescriptor.name]

    return async function (req: ExpressRequest, res: ExpressResponse ) {
        const apiRequest = new ApiRequest()
        apiRequest.params = req.params
        apiRequest.body   = req.body
        apiRequest.query  = req.query

        const apiResponse = new ApiResponse()

        await api.callAction(controller, actionDescriptor, apiRequest, apiResponse)
        res.status(apiResponse.statusCode)

        if ( apiResponse.statusText !== undefined )
            res.statusMessage = apiResponse.statusText

        for ( let content of apiResponse.content ) {
            res.send(content)
        }
    }

}

export function bootstrap( router: ExpressRouter, module: Class ) {

    const api = new AotApi()
    api.registerModule(module)

    for ( const controller of api.controllers ) {
        const controllerDescriptor = Controller.descriptor(controller)

        for ( let [name, action] of controllerDescriptor.actions.entries() ) {
            router[action.ʘroute.method](
                `/${action.ʘroute.path}`, 
                routeTo(api, controller, action)
            )
        }
    }
}


