import { Router as ExpressRouter } from "express"
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'

import { Api } from "./api"
import { Controller } from "./decorators"

import { ActionDescriptor } from "./descriptors"
import { Class } from "@lib/types"

export function routeTo( controllerInstance: any, actionDescriptor: ActionDescriptor ) {

    const method = controllerInstance[actionDescriptor.name]

    return async function (req: ExpressRequest, res: ExpressResponse ) {
        const content = await method.call(controllerInstance)
        res.send( content )
    }

}

export function bootstrap( router: ExpressRouter, module: Class ) {

    const api = new Api()
    api.registerModule(module)

    for ( const controller of api.controllers ) {
        const controllerDescriptor = Controller.descriptor(controller)
        const controllerInstance   = api.getController( controller )

        for ( let [name, action] of controllerDescriptor.actions.entries() ) {
            router[action.ʘroute.method](
                `/${action.ʘroute.path}`, 
                routeTo(controllerInstance, action)
            )
        }
    }
}


