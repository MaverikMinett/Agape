
import { Request, Response } from 'express'

export function returnResponse( 
    routeHandler: ( requestAndResponse: { request: Request, response: Response }) =>  Promise<any>
    ) {

    return async function ( request: Request, response: Response ) {

        try {
            const content = await routeHandler({ request, response })
            response.send(content)
        }
        catch (error) {
            response.send(400)
        }

    }

}