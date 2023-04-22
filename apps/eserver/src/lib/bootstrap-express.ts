import { Router } from "express"
import { Api } from "./api"
import { Controller } from "./decorators"
import { FooModule } from "../app/api/foo/foo.module"

import { Request, Response } from 'express'
import { ActionDescriptor } from "./descriptors"

export function routeTo( controllerInstance: any, actionDescriptor: ActionDescriptor ) {

    const method = controllerInstance[actionDescriptor.name]

    return async function (req: Request, res: Response ) {
        const content = await method.call(controllerInstance)
        res.send( content )
    }

}

export function bootstrap( router: Router ) {
    router.get('/ping', ( req, res ) => res.send( { message: 'pong'} ) )

    const api = new Api()
    api.registerModule(FooModule)

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


