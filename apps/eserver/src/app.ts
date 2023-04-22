import { Api } from "./lib/api";
import { ApiRequest } from './lib/api-request'
import { ApiResponse } from "./lib/api-response";
import { Controller, Get, Module } from "./lib/decorators";

import express, { Application as ExpressApplication, Router as ExpressRouter, Request as ExpressRequest, Response as ExpressResponse } from "express";


import 'reflect-metadata'


@Controller({})
export class PingController {


    @Get('ping')
    ping( request: Request, response: Response ) {

    }

}

@Module({
    'controllers': [ PingController ]
})
export class PingModule {

}

export function routeTo( controllerInstance: any, actionDescriptor: any ) {

    const method = controllerInstance[actionDescriptor.name]

    return function( 
        expressRequest: ExpressRequest, 
        expressResponse: ExpressResponse ) {

        const apiRequest = new ApiRequest()
        const apiResponse = new ApiResponse()

        method.call(controllerInstance, apiRequest, apiResponse)

    }
}

export function main( app: ExpressApplication ) {

    const router = ExpressRouter()

    // router.use('/', express.static('./apps/_swagger') )

    // router.get('/ping', ( req, res ) => res.send(  { message: 'pong' } ) )

    app.use('/api', router )

    // const router: ExpressRouter = ExpressRouter()

    // router.get('/', (req, res) => {
    //     res.send("ok")
    // })

    // app.use('/ppi', router)

    const api = new Api()
    api.registerModule(PingModule)

    // for ( const controller of api.controllers ) {
    //     const controllerDescriptor = Controller.descriptor(controller)
    //     const controllerInstance   = api.getController( controller )

    //     for ( let [name, action] of controllerDescriptor.actions.entries() ) {
    //         router[action.ʘroute.method]( 
    //             '/'+action.ʘroute.path, 
    //             routeTo(controllerInstance, action) 
    //         )
    //     }
    // }

    


    
}