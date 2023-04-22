import { Router } from "express"
import { Api } from "./api"
import { Controller } from "./decorators"
import { FooModule } from "../app/api/foo/foo.module"

export function bootstrap( router: Router ) {
    router.get('/ping', ( req, res ) => res.send( { message: 'pong'} ) )

    const api = new Api()
    api.registerModule(FooModule)

    for ( const controller of api.controllers ) {
        const controllerDescriptor = Controller.descriptor(controller)
        const controllerInstance   = api.getController( controller )

        for ( let [name, action] of controllerDescriptor.actions.entries() ) {

            router.get(
                `/${action.ʘroute.path}`, 
                ( req, res ) => res.send( { message: 'bar'} ) )

            // router[action.ʘroute.method]( 
            //     '/'+action.ʘroute.path, 
            //     routeTo(controllerInstance, action) 
            // )
        }
    }
}
